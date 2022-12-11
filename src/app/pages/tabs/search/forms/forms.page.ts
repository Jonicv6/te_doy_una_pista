import { Component, OnInit, Input, ɵɵNgOnChangesFeature } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReserveDataService } from 'src/app/services/reserve-data.service';
import { SendParamsService } from 'src/app/services/send-params.service';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';
import { SportCenter } from 'src/models/sportcenter';
import { Track } from 'src/models/track';
import { DatePipe } from '@angular/common'
import { Reserve } from 'src/models/reserve';
import Swal from 'sweetalert2';
import { ReserveLocal } from 'src/models/reserveLocal';
import { threadId } from 'worker_threads';
import { Hour } from 'src/models/hours';
import { LoadingController } from '@ionic/angular';
import { getElement } from 'devextreme-angular';


//@Input() sportCenter:any;
@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  env = environment;
  sportCenter: SportCenter;
  sportCenterName: string;
  sport: string;
  selectDay: string = undefined;
  minDay: string = new Date().toLocaleDateString('en-US');
  actualHour: string = new Date().toLocaleTimeString().split(":")[0];
  defaultHours: Hour[] = environment.hoursOpen;
  hoursFree: Hour[] = [];
  hoursEmpty: boolean = true;
  tracks: Track[] = [];
  selectTrack: Track = undefined;
  selectHour: string = undefined;
  nameReserve: string = undefined;
  loading: any;
  closeComment: boolean = true;


  constructor(private route: Router, private activedRoute: ActivatedRoute,
    public getParams: SendParamsService,
    private trackDataService: TrackDataService,
    private sportCenterDataService: SportCenterDataService,
    private reserveDataService: ReserveDataService,
    private datepipe: DatePipe,
    private loadingCtrl: LoadingController,) {

  }

  ngOnInit() {
    this.getData();
    this.localData();
  }

  //Se borra el cache de la vista cuando pasa a activa
  //Asi el formulario este vacio al entrar en el caso de haber hecho una reserva
  //en esa misma pista
  ionViewWillEnter() {
    this.getData();
    this.localData();
  }

  async getData() {
    //Activamos el loading y cargamos los datos
    await this.presentLoading(environment.textLoading);
    this.loading.present();

    //Recogemos los datos enviados desde la página Search
    let id = this.activedRoute.snapshot.params['id'];
    this.sport = this.activedRoute.snapshot.params['sport'];

    //Esperamos que devuelva los datos del pabellon
    await this.sportCenterDataService.getSportCenter(id).toPromise().then(r => {

      this.sportCenter = r;
      //Por fallo en la variable, debo de usar una exclusiva para el titulo
      this.sportCenterName = this.sportCenter.name;
    });

    //Esperamos que devuelva los datos de las pistas de ese pabellon y ese deporte
    await this.trackDataService.getTrackSportCenter(id, this.sport)
      .toPromise().then(result => {
        this.tracks = result;
      });
  }

  async localData() {

    setTimeout(async () => {
      //Busca en los archivos locales Profile, donde guardaremos los datos favoritos del usuario
      if (localStorage.getItem('profile') != null) {
        let dataLocal = await JSON.parse(localStorage.getItem('profile'));
        this.nameReserve = dataLocal['name'];
      }

      //Desactivamos el mensaje de carga
      this.loading.dismiss();
    }, 1500);

  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 1500
    });
  }


  changeTrack(trackAux: Track) {
    this.selectTrack = trackAux;
    this.selectDay = undefined;
    this.hoursFree = [];
    this.checkHoursEmpty();
  }


  /* --------------- Horas restantes con un margen de dos horas --------------- */
  activeHour() {
    if (this.selectTrack == undefined) {
      Swal.fire({
        title: this.env.titleErrorSelectDay,
        text: this.env.errorSelectDay,
        icon: 'error',
        heightAuto: false
      })
      this.selectDay = undefined;

    } else {

      this.selectHour = undefined;
      //Transformamos la fecha yyyy-MM-dd a dd-MM-yyyy(formato de la BD)
      let formatDate = this.datepipe.transform(this.selectDay, 'dd-MM-yyyy');

      //Realizamos la consulta para que nos devuelva la lista de reservas.
      this.reserveDataService.getReservesForTrackDate(this.selectTrack.idTrack, formatDate)
        .subscribe(async result => {
          let reservesBD: Reserve[] = result;
          let hoursReserveThisTrackDay: string[] = []; //Horas ocupadas de esa pista y dia seleccionados
          for (let reserve of reservesBD) {
            hoursReserveThisTrackDay.push(reserve.hour.split(":")[0]);
          }

          //Son las horas ocupadas en las pistas que interseccionan
          let hoursReserveTrackIntersection: string[] = [];

          //Consultamos las horas de las pistas que interseccionen
          let typeTrackIntersection: string;
          switch (this.selectTrack.type) {
            case "Vertical":
              typeTrackIntersection = "Horizontal";
              break;
            case "Horizontal":
              typeTrackIntersection = "Vertical";
              break;

            default:
              break;
          }

          await this.reserveDataService.getHourReservesForSportCenterDateType(this.sportCenter.idSportCenter, formatDate, typeTrackIntersection).toPromise().then(result => {
            //Recorremos la lista y a traves del id (r) vamos cogiendo el valor hour, unicamente la hora
            for (let r in result) {
              hoursReserveTrackIntersection.push(result[r].hour.split(":")[0]);
            }
          });

          this.hoursFree = []  //Reiniciamos la variable
          //Rellenamos la variable hours con una diferencia minima de dos horas
          for (let hourElement of this.defaultHours) {
            //Transformamos temporalmente la variable minDay 
            let today = this.datepipe.transform(this.minDay, 'dd-MM-yyyy');
            //Rellenamos las horas libres segun si es el dia seleccionado o no
            //Tambien comprobamos que la hora libre no esté ni en esa pista en ese dia
            //Ni en las pistas que interseccionen
            if (today === formatDate && !hoursReserveThisTrackDay.includes(hourElement.hour) && (!hoursReserveTrackIntersection.includes(hourElement.hour) || hoursReserveTrackIntersection.length == 0)) {
              if (Number.parseInt(hourElement.hour) >= Number.parseInt(this.actualHour.toString()) + 2) {
                this.hoursFree.push(hourElement);
              }
            } else if (today != this.selectDay && !hoursReserveThisTrackDay.includes(hourElement.hour) && !hoursReserveTrackIntersection.includes(hourElement.hour)) {
              this.hoursFree.push(hourElement);
            }
          }
          console.log(this.hoursFree);
          this.checkHoursEmpty();

        });
    }
  }

  changeHour(selectHourForm) {
    this.selectHour = selectHourForm.hour + ":" + selectHourForm.minutes;
    console.log(this.selectHour);
  }

  checkHoursEmpty() {
    //Si hay un dia seleccionado y no hay horas disponible mostrará un mensaje
    if (this.hoursFree.length == 0 && this.selectDay != undefined) {
      this.hoursEmpty = true;
    } else {
      //No muestra el mensaje al haber al menos una hora disponible
      //
      if (this.selectDay != undefined) {
        //Si el dia está seleccionado visualizamos el selector de Horas
        document.getElementById("hourPicker").style.visibility = "visible";
        this.hoursEmpty = false;
      } else {
        //Si el dia no está seleccionado ocultamos el selector de Horas
        document.getElementById("hourPicker").style.visibility = "hidden";
        this.hoursEmpty = true;

      }
    }
  }

  async checkReserve() {

    //Si algún campo está vacio salta el alert
    if (this.selectTrack == undefined || this.selectDay == undefined || this.selectHour == undefined || this.nameReserve == (undefined || null)) {
      Swal.fire({
        title: this.env.titleErrorDataReserve,
        text: this.env.errorDataReserve,
        icon: 'error',
        heightAuto: false
      })
    } else {
      //Recoge los datos seleccionados
      let formatDate = this.datepipe.transform(this.selectDay, 'dd-MM-yyyy');

      //Creamos la variable Reserva
      let reserve = <any>{ track: this.selectTrack.idTrack, date: formatDate, hour: this.selectHour, user: this.nameReserve };

      //Comprobamos si la pista esta disponible antes de guardarla
      let reserveAvailable = await this.checkDateReserveEmpty(reserve);

      if (reserveAvailable) {
        //Creamos la reserva en la base de datos
        this.reserveDataService.createReserve(reserve).subscribe(r => {

          let listReserveLocal: ReserveLocal[] = [];
          if (JSON.parse(localStorage.getItem('reserves')) != null) {
            listReserveLocal = JSON.parse(localStorage.getItem('reserves'));
          }

          //Creamos la variable que guardaremos en local, con el id de la reserva creada
          let reserveLocal = <ReserveLocal>{ idReserve: r['idReserve'], sportCenter: this.sportCenter, track: this.selectTrack, date: formatDate, hour: this.selectHour, user: this.nameReserve };
          listReserveLocal.push(reserveLocal);
          localStorage.setItem('reserves', JSON.stringify(listReserveLocal));

          Swal.fire({
            title: this.env.titleSuccessReserve,
            text: this.env.successReserve,
            icon: 'success',
            heightAuto: false,
          });
          this.route.navigateByUrl('tabs/reserve');
        }
        );
      } else {
        //Mostramos error al realizar la reserva
        Swal.fire({
          title: this.env.titleErrorReserve,
          text: this.env.errorReserve,
          icon: 'error',
          heightAuto: false
        })
      }
    }
  }

  // Comprobamos que la Reserva está disponible en la fecha y pista seleccionadas, justo antes de guardarla en BBDD.
  async checkDateReserveEmpty(reserve) {
    //Consultamos las horas de las pistas que interseccionen
    let typeTrackIntersection: string;
    switch (this.selectTrack.type) {
      case "Vertical":
        typeTrackIntersection = "Horizontal";
        break;
      case "Horizontal":
        typeTrackIntersection = "Vertical";
        break;

      default:
        break;
    }

    let TrackReserved = [];

    // Comprobamos si existe una reserva a la misma hora en una pista que interseccione con la seleccionada
    await this.reserveDataService.getHourReservesForSportCenterDateType(this.sportCenter.idSportCenter, reserve.date, typeTrackIntersection).toPromise().then(result => {
      let resultFilter = result.filter(function (filterReserve) {
        if (filterReserve.hour === reserve.hour) {
          return filterReserve.hour;
        }
      });

      if (resultFilter.length != 0) {
        TrackReserved.push(resultFilter);
      }

    });

    // Comprobamos si existe una reserva a la misma hora en la misma pista y fecha 
    await this.reserveDataService.getReservesForTrackDate(reserve.track, reserve.date).toPromise().then(result => {

      let resultFilter = result.filter(function (filterReserve) {
        if (filterReserve.hour === reserve.hour) {
          return filterReserve.hour;
        }
      });

      if (resultFilter.length != 0) {
        TrackReserved.push(resultFilter);
      }

    });

    // Si no hay ninguna pista que interseccione a esa hora o la misma pista esté ocupada a esa hora, permite reservarla
    if (TrackReserved.length != 0) {
      return false;
    } else {
      return true;
    }
  }

  readComment(){
    if(this.closeComment){
      this.closeComment = false;
    }else{
      this.closeComment = true;
    }

    let listComments = document.getElementById('comments');
    //Si la clase está en el elemento, la elimina, sino, la añade.
    listComments.classList.toggle('openComment');
    listComments.classList.toggle('closeComment');


    let containerComment = document.getElementById('containerComment');
    containerComment.classList.toggle('moveButtonOpen');
    containerComment.classList.toggle('moveButtonClose');
    
  }


}
