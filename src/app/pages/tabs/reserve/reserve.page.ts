import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

//Services
import { ReserveDataService } from 'src/app/services/reserve-data.service';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { OpenMeteoAPI } from 'src/app/services/weather-api.service';


import { environment } from 'src/environments/environment';
import { ReserveLocal } from 'src/models/reserveLocal';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { WeatherAPI } from 'src/models/jsonWeather';
import { ModalWeather } from './modals/modalWeather';
import { ModalComment } from './modals/modalComment';
import { CommentDataService } from 'src/app/services/comment-data.service';
import { Comment } from 'src/models/comment';
import { Reserve } from 'src/models/reserve';


@Component({
  selector: 'app-reserve',
  templateUrl: 'reserve.page.html',
  styleUrls: ['reserve.page.scss']
})
export class ReservePage implements OnInit {
  sportAux = null;
  listReservesPending: ReserveLocal[] = [];
  listReservesCompleted: ReserveLocal[] = [];
  env = environment;
  today = new Date().toLocaleDateString('en-US');
  actualHour: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  checkReserveFuture = true;
  checkReservePast = false;
  listReservesPendingObservable: any;
  listReservesCompletedObservable: any;
  Json_EditWeather: WeatherAPI = null;
  modalActive: boolean = false;

  constructor(
    public navCtrl: NavController,
    private reserveDataService: ReserveDataService,
    private SportCenterDataService: SportCenterDataService,
    private OpenMeteoAPI: OpenMeteoAPI,
    private datepipe: DatePipe,
    public modalController: ModalController,
    private commentDataService: CommentDataService) {
    this.today = this.datepipe.transform(this.today, 'dd-MM-yyyy');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //Refresca los datos cada vez que la pestaña está en vista activa.
    this.getDataLocal();
  }

  doRefresh(event) {
    this.getDataLocal();
    //Cuando finalice la lectura de datos, cancelamos el refresh.
    event.target.complete();

  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  deleteReserve(reserve) {
    Swal.fire({
      title: this.env.titleDeleteReserve,
      text: this.env.textDeleteReserve,
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.env.buttonConfirmDelete,
      cancelButtonText: this.env.buttonCancelDelete
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.listReservesPending.includes(reserve)) {
          //Borramos la reserva de la lista
          let index = this.listReservesPending.indexOf(reserve);
          this.listReservesPending.splice(index, 1);
          //Actualizamos la lista en local
          localStorage.setItem('reserves', JSON.stringify(this.listReservesPending));
          //Borramos la reserva de la base de datos
          this.reserveDataService.deleteReserve(reserve).subscribe(r => {
            console.log(r);
            Swal.fire({
              title: this.env.titleDeleted,
              text: this.env.successReserveDeleted,
              icon: 'success',
              heightAuto: false
            })
          });
          this.getDataLocal();
        }

        if (this.listReservesCompleted.includes(reserve)) {
          //Borramos la reserva de la lista
          let index = this.listReservesCompleted.indexOf(reserve);
          this.listReservesCompleted.splice(index, 1);
          //Actualizamos la lista en local
          localStorage.setItem('reserves', JSON.stringify(this.listReservesCompleted));
          //Borramos la reserva de la base de datos
          this.reserveDataService.deleteReserve(reserve).subscribe(r => {
            console.log(r);
            Swal.fire({
              title: this.env.titleDeleted,
              text: this.env.successReserveDeleted,
              icon: 'success',
              heightAuto: false
            })
          });
          this.getDataLocal();
        }
      }
    })
  }

  commentInfoMeter(reserve) {
    this.SportCenterDataService.getSportCenter(reserve.sportCenter.idSportCenter).toPromise().then(sportcenterWeather => {
      let request = this.OpenMeteoAPI.getWeatherWithCoord(sportcenterWeather.latitude, sportcenterWeather.longitude,
        reserve.date, reserve.hour).toPromise().then(
          resultWeather => {

            //console.log(resultWeather);
            //Personalizamos el JSON para aplicarlos directamente en el modal.
            let hour_id = parseInt(reserve.hour.split(":")[0]);

            //Info del WeatherCode de la API
            /*
            0	Cielo limpio
            1, 2, 3	Principalmente despejado, parcialmente nublado y nublado
            45, 48	Niebla y niebla de escarcha depositada
            51, 53, 55	Llovizna: Intensidad ligera, moderada y densa
            56, 57	Llovizna Engelante: Intensidad ligera y densa
            61, 63, 65	Lluvia: Intensidad leve, moderada y fuerte
            66, 67	Lluvia helada: Intensidad ligera y fuerte
            71, 73, 75	Caída de nieve: Intensidad ligera, moderada y fuerte
            77	Granos de nieve
            80, 81, 82	Lluvias: Leve, moderada y violenta
            85, 86	Chubascos de nieve leves y fuertes
            95 *	Tormenta: Ligera o moderada
            96, 99 *	Tormenta con granizo leve y fuerte
            */

            /*Posiciones del sprite
            116 x 0 = 0    
            116 x 1 = 116
            116 x 2 = 232    
            116 x 3 = 348
            116 x 4 = 464
            116 x 5 = 580
            116 x 6 = 696
            */

            //Modificamos el icono a presentar en función del código que recibimos
            let image_weather_pos = "-464px -464px";

            switch (resultWeather.hourly.weathercode[hour_id]) {
              //Despejado
              case 0:
                if (hour_id >= 9 && hour_id <= 19) { //Dia
                  image_weather_pos = "-0px -232px";
                } else { //Noche
                  image_weather_pos = "-464px -464px";
                }
                break;

              //Poco nublado
              case 1:
                if (hour_id >= 9 && hour_id <= 19) { //Dia
                  image_weather_pos = "-464px -232px";
                } else { //Noche
                  image_weather_pos = "-348px -580px";
                }
                break;

              //Parcialmente nublado
              case 2:
                if (hour_id >= 9 && hour_id <= 19) { //Dia
                  image_weather_pos = "-348px -232px";
                } else { //Noche
                  image_weather_pos = "-0px -580px";
                }
                break;

              //Muy Nublado
              case 3:
                if (hour_id >= 9 && hour_id <= 19) { //Dia
                  image_weather_pos = "-116px -348px";
                } else { //Noche
                  image_weather_pos = "-232px -580px";
                }
                break;

              //Neblina
              case 45: case 48:
                if (hour_id >= 9 && hour_id <= 19) { //Dia
                  image_weather_pos = "-116px -242px";
                } else { //Noche
                  image_weather_pos = "-116px -580px";
                }
                break;

              //Llovizna
              case 51: case 53: case 55: case 56: case 57:
                if (hour_id >= 9 && hour_id <= 19) { //Dia
                  image_weather_pos = "-0px -348px";
                } else { //Noche
                  image_weather_pos = "-464px -0px";
                }
                break;

              //Lluvia leve
              case 61: case 80:
                image_weather_pos = "-232px -0px";
                break;

              //Lluvia moderada
              case 63: case 81:
                image_weather_pos = "-464px -348px";
                break;

              //Lluvia fuerte
              case 65: case 82:
                image_weather_pos = "-232px -464px";
                break;

              //Lluvia helada
              case 66: case 67:
                image_weather_pos = "-464px -116px";
                break;

              //Nevanda
              case 71: case 73: case 75: case 77: case 85: case 86:
                image_weather_pos = "-348px -116px";
                break;

              //Torment
              case 95:
                if (hour_id >= 9 && hour_id <= 19) { //Dia
                  image_weather_pos = "-242px -348px";
                } else { //Noche
                  image_weather_pos = "-242px -116px";
                }
                break;

              default:
                image_weather_pos = "-464px -464px";
                break;
            }

            //Juntamos todos los datos en el nuevo JSON
            this.Json_EditWeather = {
              'latitude': resultWeather.latitude,
              'longitude': resultWeather.longitude,
              'timezone': resultWeather.timezone,
              'temperature_hour': resultWeather.hourly.temperature_2m[hour_id],
              'precipitation_hour': resultWeather.hourly.precipitation[hour_id],
              'weathercode_hour': resultWeather.hourly.weathercode[hour_id],
              'temperature_max': resultWeather.daily.temperature_2m_max[0],
              'temperature_min': resultWeather.daily.temperature_2m_min[0],
              'windspeed_max': resultWeather.daily.windspeed_10m_max[0],
              'image_weather': image_weather_pos
            };

            //console.log(this.Json_EditWeather);
            this.presentModalWeather();
          }
        );
    });
  }

  async presentModalWeather() {
    const modal = await this.modalController.create({
      component: ModalWeather,
      componentProps: {
        weatherData: this.Json_EditWeather
      }
    });
    modal.cssClass = 'ion-modal';
    this.modalActive = true;
    await modal.present();
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.modalActive = false;
      }
    });

    return;
  }

  commentReserve(reserve) {
    this.presentModalComment(reserve);
    //this.navCtrl.navigateForward('tabs/search/forms/' + reserve.sportcenter.idSportCenter + "/" + this.sportAux);

  }

  async presentModalComment(reserve:Reserve) {
    //Preparamos el modal, indicando la clase CSS y esperamos al cierre de esta para recoger los datos.
    const modal = await this.modalController.create({
      component: ModalComment,
    });
    modal.cssClass = 'ion-modal';
    this.modalActive = true;
    await modal.present();
    modal.onDidDismiss().then((dataReturned) => {
      this.modalActive = false;

      //Si el usuario vuelve sin realizar el comentario, no se muestra nada
      if (dataReturned.data.dismissed !== true) {
        console.log(dataReturned);
        //Verificamos que los datos devueltos del Modal no sean nulos.
        if (dataReturned.data.comment==null || dataReturned.data.score == null){
          Swal.fire({
            title: this.env.titleErrorComment,
            text: this.env.errorComment,
            icon: 'error',
            heightAuto: false
          })

        }else {
          //Una vez verificados, lo guardamos en la base de datos.
          let comment = <any>{
            "track": reserve.track.idTrack,
            "user": reserve.user,
            "text": dataReturned.data.comment,
            "date": reserve.date,
            "score": parseInt(dataReturned.data.score)
          }
          console.log(comment);
          this.commentDataService.createComment(comment).subscribe(r => {
            let resultado = <any> r;
            console.log(resultado.Status);
            if(resultado.Status == "Comment Saved"){
              Swal.fire({
                title: this.env.titleSuccessComment,
                text: this.env.successComment,
                icon: 'success',
                heightAuto: false
              })
            }
          });
        }
      }
    });

    return;
  }

  //metodo para leer los datos locales
  async getDataLocal() {
    this.listReservesPending = [];
    this.listReservesCompleted = [];

    let list: ReserveLocal[] = await JSON.parse(localStorage.getItem('reserves'));

    list.forEach(reserve => {
      let reserveDate = reserve.date.split("-");
      let todayDate = this.today.split("-");

      //console.log(reserve.hour.substring(0, 2) + " -  " + this.actualHour.substring(0, 2))
      // Primer filtro, si la reserva es hoy y aún no se ha cumplido la hora y/o minutos
      if (reserve.date == this.today &&
        (reserve.hour.substring(0, 2) > this.actualHour.substring(0, 2) ||
          reserve.hour.substring(0, 2) == this.actualHour.substring(0, 2) && reserve.hour.substring(3, 4) >= this.actualHour.substring(3, 4))) {
        reserve.time = 0;
        this.listReservesPending.push(reserve);
      } else if (
        //EXPLICACION: Dia posterior pero mismo mes y año - Mes posterior pero mismo año - Año posterior
        //En caso de que no sea la misma fecha, ni la hora del evento, se convierte en un evento futuro
        (reserveDate[0] > todayDate[0] && reserveDate[1] == todayDate[1] && reserveDate[2] == todayDate[2]) ||
        (reserveDate[1] > todayDate[1] && reserveDate[2] == todayDate[2]) ||
        (reserveDate[2] > todayDate[2])) {
        this.listReservesPending.push(reserve);
        reserve.time = 1;

        //console.log("RESERVA: " + reserve.date + " - TODAY: " + this.today + " - RESERVE HOUR: " + reserve.hour + " - HOUR: " + this.actualHour);

      } else {
        reserve.time = -1;
        this.listReservesCompleted.push(reserve)
      }
    });

    this.listReservesCompleted.sort((objA, objB) => {
      return this.orderArrayDate(objA, objB);
    });

    this.listReservesPending.sort((objA, objB) => {
      return this.orderArrayDate(objA, objB);
    });

    this.listReservesCompletedObservable = new BehaviorSubject(this.listReservesCompleted);
    this.listReservesPendingObservable = new BehaviorSubject(this.listReservesPending);

    //console.log("LISTRESERVES:");
    //console.log(this.listReservesPending);
    //console.log("LISTRESERVESCOMPLETED:");
    //console.log(this.listReservesCompleted);
  }

  //Metodo para ordenar las reserva, de forma que la mas próxima esté primera
  //Primero compara el año, luego el mes y luego el dia
  orderArrayDate(objA, objB) {
    let dateA = objA.date.split('-');
    let dateB = objB.date.split('-');

    let hourA = objA.hour.split(':');
    let hourB = objB.hour.split(':');

    console.log()

    let comparativeA = new Date(Number(dateA[2]), Number(dateA[1]), Number(dateA[0]), Number(hourA[0]), Number(hourA[1]));
    let comparativeB = new Date(Number(dateB[2]), Number(dateB[1]), Number(dateB[0]), Number(hourB[0]), Number(hourB[1]));
    return comparativeA.getTime() - comparativeB.getTime();
  }

  showFuture() {
    //console.log("ShowFuture");
    this.checkReserveFuture = true;
    this.checkReservePast = false;
  }

  showPast() {
    //console.log("ShowPast");
    this.checkReserveFuture = false;
    this.checkReservePast = true;
  }

}
