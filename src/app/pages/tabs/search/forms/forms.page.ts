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
  defaultHours: any[] = environment.hoursOpen;
  hours: string[] = [];
  hoursEmpty: boolean = false;
  tracks: Track[] = [];
  selectTrack: Track = undefined;
  selectHour: string = undefined;
  nameReserve: string = undefined;


  constructor(private route: Router, private activedRoute: ActivatedRoute,
    public getParams: SendParamsService,
    private trackDataService: TrackDataService,
    private sportCenterDataService: SportCenterDataService,
    private reserveDataService: ReserveDataService,
    private datepipe: DatePipe) {

  }

  ngOnInit() {
    this.getData();
  }

  //Se borra el cache de la vista cuando pasa a activa
  //Asi el formulario este vacio al entrar en el caso de haber hecho una reserva
  //en esa misma pista
  ionViewWillEnter() {
    this.getData();
  }

  async getData() {
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


  changeTrack(trackAux: Track) {
    this.selectTrack = trackAux;
    this.selectDay = undefined;
    this.hours = [];
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

          this.hours = []  //Reiniciamos la variable
          //Rellenamos la variable hours con una diferencia minima de dos horas
          for (let hour of this.defaultHours) {
            //Transformamos temporalmente la variable minDay 
            let today = this.datepipe.transform(this.minDay, 'dd-MM-yyyy');
            //Rellenamos las horas libres segun si es el dia seleccionado o no
            //Tambien comprobamos que la hora libre no esté ni en esa pista en ese dia
            //Ni en las pistas que interseccionen
            if (today === formatDate && !hoursReserveThisTrackDay.includes(hour) && (!hoursReserveTrackIntersection.includes(hour) || hoursReserveTrackIntersection == [])) {
              if (Number.parseInt(hour) >= Number.parseInt(this.actualHour.toString()) + 2) {
                this.hours.push(hour);
              }
            } else if (today != this.selectDay && !hoursReserveThisTrackDay.includes(hour) && !hoursReserveTrackIntersection.includes(hour)) {
              this.hours.push(hour);
            }
          }

          this.checkHoursEmpty();

        });
    }
  }

  checkHoursEmpty() {
    //Si hay un dia seleccionado y no hay horas disponible mostrará un mensaje
    if (this.hours.length == 0 && this.selectDay != undefined) {
      this.hoursEmpty = true;
    } else if (this.selectDay != undefined) {
      //Si el dia está seleccionado
      document.getElementById("hourPicker").setAttribute("disabled", 'false');
      document.getElementById("hourPicker").style.color = "white";
      this.hoursEmpty = false;
    } else {
      //Si el dia no está seleccionado
      document.getElementById("hourPicker").setAttribute("value", "");
      document.getElementById("hourPicker").setAttribute("disabled", 'true');
      document.getElementById("hourPicker").style.color = "floralwhite !important";
      this.hoursEmpty = false;
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
      let selectHourAux = this.selectHour.split("T")[1].split(":")[0];
      let formatDate = this.datepipe.transform(this.selectDay, 'dd-MM-yyyy');

      //Creamos la variable Reserva
      let reserve = <any>{ track: this.selectTrack.idTrack, date: formatDate, hour: selectHourAux + ":00", user: this.nameReserve };

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
          let reserveLocal = <ReserveLocal>{ idReserve: r['idReserve'], sportCenter: this.sportCenter, track: this.selectTrack, date: formatDate, hour: selectHourAux + ":00", user: this.nameReserve };
          listReserveLocal.push(reserveLocal);
          localStorage.setItem('reserves', JSON.stringify(listReserveLocal));

          Swal.fire({
            title: this.env.titleSuccessReserve,
            text: this.env.successReserve,
            icon: 'success',
            heightAuto: false,
          });
          this.route.navigateByUrl('tabs/search');
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

}
