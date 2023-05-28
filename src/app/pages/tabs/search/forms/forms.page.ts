import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveDataService } from 'src/app/services/reserve-data.service';
import { SendParamsService } from 'src/app/services/send-params.service';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { CommentDataService } from 'src/app/services/comment-data.service';
import { environment } from 'src/environments/environment';
import { SportCenter } from 'src/models/sportcenter';
import { Track } from 'src/models/track';
import { DatePipe } from '@angular/common'
import { Reserve } from 'src/models/reserve';
import Swal from 'sweetalert2';
import { ReserveLocal } from 'src/models/reserveLocal';
import { Hour } from 'src/models/hours';
import { Comment } from 'src/models/comment';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/models/email';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// @Input() sportCenter:any;
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
  emailReserve: string = undefined;
  nameReserve: string = undefined;
  closeComment: boolean = true;
  listComments: Comment[] = [];
  listCommentsEmpty: boolean = false;
  reserveForm: FormGroup;


  constructor(private route: Router, private activedRoute: ActivatedRoute,
    public getParams: SendParamsService,
    private trackDataService: TrackDataService,
    private sportCenterDataService: SportCenterDataService,
    private reserveDataService: ReserveDataService,
    private commentDataService: CommentDataService,
    private datepipe: DatePipe,
    private emailService: EmailService,
    private sweetAlertService: SweetAlertService,
    private formBuilder: FormBuilder) {

    // Validamos el nombre y el email (en caso de que sea necesario)
    this.reserveForm = this.formBuilder.group({
      nameReserve: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^(?!\\s)[a-zA-Z\\s]+$')]],
      emailReserve: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\,]+)@([a-zA-Z0-9_\\-\\,]{2,})\\.([a-zA-Z]{2,})$')]]
    })

  }

  ngOnInit() {

  }

  // Se borra el cache de la vista cuando pasa a activa
  // Asi el formulario este vacio al entrar en el caso de haber hecho una reserva
  // en esa misma pista
  ionViewWillEnter() {
    this.getData();
  }

  // Obtiene los datos necesarios para mostrar en el formulario
  async getData() {
    // Activamos el loading y cargamos los datos
    await this.sweetAlertService.presentLoading(environment.textLoading);
    this.sweetAlertService.loading.present();

    // Recogemos los datos enviados desde la página Search
    let id = this.activedRoute.snapshot.params['id'];
    this.sport = this.activedRoute.snapshot.params['sport'];

    // Esperamos que devuelva los datos del pabellon
    await this.sportCenterDataService.getSportCenter(id)
      .toPromise().then(r => {

        this.sportCenter = r;
        // Por fallo en la variable, debo de usar una exclusiva para el titulo
        this.sportCenterName = this.sportCenter.name;

      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR GETSPORTCENTER: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });;

    // Esperamos que devuelva los datos de las pistas de ese pabellon y ese deporte
    await this.trackDataService.getTrackSportCenter(id, this.sport)
      .toPromise().then(result => {
        this.tracks = result;
      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR GETTRACK: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });


    this.localData();
  }

  // Carga los datos locales guardados del usuario
  async localData() {

    setTimeout(async () => {
      // Busca en los archivos locales Profile, donde guardaremos los datos favoritos del usuario
      if (localStorage.getItem('profile') != null) {
        let dataLocal = await JSON.parse(localStorage.getItem('profile'));
        this.nameReserve = dataLocal['name'];
        this.emailReserve = dataLocal['email'];
      }

      //Desactivamos el mensaje de carga
      this.sweetAlertService.loading.dismiss();
    }, 1500);

  }


  changeTrack(trackAux: Track) {
    this.selectTrack = trackAux;
    this.selectDay = undefined;
    this.hoursFree = [];
    this.checkHoursEmpty();
    this.loadComment();
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

          await this.reserveDataService.getHourReservesForSportCenterDateType(this.sportCenter.idSportCenter, formatDate, typeTrackIntersection)
            .toPromise().then(result => {
              //Recorremos la lista y a traves del id (r) vamos cogiendo el valor hour, unicamente la hora
              for (let r in result) {
                hoursReserveTrackIntersection.push(result[r].hour.split(":")[0]);
              }
            }).catch(async (e) => {
              await this.sweetAlertService.showErrorConnection().then(() => {
                console.log("ERROR GETHOURRESERVE: " + e.message);
                //Una vez finaliza la muestra del error, vuelve a intentar cargar
                this.getData();
              });
            });;

          this.hoursFree = []  //Reiniciamos la variable
          //Rellenamos la variable hours con una diferencia minima de dos horas
          for (let hourElement of this.defaultHours) {
            //Transformamos temporalmente la variable minDay 
            let today = this.datepipe.transform(this.minDay, 'dd-MM-yyyy');
            //Rellenamos las horas libres segun si es el dia seleccionado o no
            //Tambien comprobamos que la hora libre no esté ni en esa pista en ese dia
            //Ni en las pistas que interseccionen
            if (today === formatDate && !hoursReserveThisTrackDay.includes(hourElement.hour) &&
              (!hoursReserveTrackIntersection.includes(hourElement.hour) || hoursReserveTrackIntersection.length == 0)) {
              if (Number.parseInt(hourElement.hour) >= Number.parseInt(this.actualHour.toString()) + 2) {
                this.hoursFree.push(hourElement);
              }
            } else if (today != this.selectDay && !hoursReserveThisTrackDay.includes(hourElement.hour) && !hoursReserveTrackIntersection.includes(hourElement.hour)) {
              this.hoursFree.push(hourElement);
            }
          }
          //console.log(this.hoursFree);
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

    try {
      await this.sweetAlertService.presentLoading(this.env.textSendEmail);
      this.sweetAlertService.loading.present();

      //Si algún campo está vacio salta el alert
      if (this.selectTrack == undefined ||
        this.selectDay == undefined ||
        this.selectHour == undefined ||
        !this.reserveForm.valid ||
        (!this.reserveForm.valid && this.emailReserve == undefined)) {
        this.sweetAlertService.loading.dismiss();
        this.sweetAlertService.showAlert(this.env.titleErrorDataReserve, this.env.errorDataReserve, 'error');

      } else if (this.reserveForm.valid) {
        //Recoge los datos seleccionados
        let formatDate = this.datepipe.transform(this.selectDay, 'dd-MM-yyyy');

        //Creamos la variable Reserva
        let reserve = <any>{ track: this.selectTrack.idTrack, date: formatDate, hour: this.selectHour, user: this.nameReserve };

        //Comprobamos si la pista esta disponible antes de guardarla
        let reserveAvailable = await this.checkDateReserveEmpty(reserve);

        if (reserveAvailable) {
          //Creamos la reserva en la base de datos
          this.reserveDataService.createReserve(reserve).subscribe(async r => {

            let listReserveLocal: ReserveLocal[] = [];
            if (JSON.parse(localStorage.getItem('reserves')) != null) {
              listReserveLocal = JSON.parse(localStorage.getItem('reserves'));
            }

            //Creamos la variable que guardaremos en local, con el id de la reserva creada
            let reserveLocal = <ReserveLocal>{
              idReserve: r['idReserve'], sportCenter: this.sportCenter,
              track: this.selectTrack, date: formatDate, hour: this.selectHour, user: this.nameReserve
            };
            listReserveLocal.push(reserveLocal);
            localStorage.setItem('reserves', JSON.stringify(listReserveLocal));

            let email: Email = {
              from: "Nueva Reserva - Tedoyunapista",
              to: this.emailReserve,
              subject: "Nueva reserva realizada",
              text: "Se ha realizado una nueva reserva",
              html: "<table border='1'>" +
                "<caption>DATOS DE LA RESERVA</caption>" +
                "<tr>" +
                "<td>" + environment.sportcenter.toUpperCase().toString() +
                "</td>" +
                "<td>" + reserveLocal.sportCenter.name +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" + environment.track.toUpperCase().toString() +
                "</td>" +
                "<td>" + reserveLocal.track.name +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" + environment.date.toUpperCase().toString() +
                "</td>" +
                "<td>" + reserveLocal.date +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" + environment.hour.toUpperCase().toString() +
                "</td>" +
                "<td>" + reserveLocal.hour +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" + environment.reserveName.toUpperCase().toString() +
                "</td>" +
                "<td>" + reserveLocal.user +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" + environment.titleUbication.toUpperCase().toString() +
                "</td>" +
                "<td>" + "<a href=\"https://www.google.es/maps?q=" + reserveLocal.sportCenter.latitude + "," + reserveLocal.sportCenter.longitude + "\">" + this.env.titleUbication + "</a>" +
                "</td>" +
                "</tr>" +
                "</table>"
            }
            console.log("ANTES DE ENVIAR CORREO");
            await this.emailService.sendMail(email).toPromise()
              .then((e) => {
                console.log(e)
              })
              .finally(() => {

                //console.log("CORREO FINALIZADO");
                this.sweetAlertService.loading.dismiss();
                this.sweetAlertService.showAlert(this.env.titleSuccessReserve, this.env.successReserve, 'success')
                  .then(() => {
                    this.route.navigateByUrl('tabs/reserve');
                  });

              })
              .catch(async (e) => {
                throw e;
              });
          }
          );
        } else {
          this.sweetAlertService.loading.dismiss();
          //Mostramos error al realizar la reserva
          this.sweetAlertService.showAlert(this.env.titleErrorReserve, this.env.errorReserve, 'error')
        }
      }
    } catch (error) {

      this.sweetAlertService.loading.dismiss();
      await this.sweetAlertService.showErrorConnection().then(() => {
        //console.log("ERROR SENDEMAIL: " + e.message);
        //Una vez finaliza la muestra del error, vuelve a intentar cargar
        this.getData();
      });
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
    await this.reserveDataService.getHourReservesForSportCenterDateType(this.sportCenter.idSportCenter, reserve.date, typeTrackIntersection)
      .toPromise().then(result => {
        let resultFilter = result.filter(function (filterReserve) {
          if (filterReserve.hour === reserve.hour) {
            return filterReserve.hour;
          }
        });

        if (resultFilter.length != 0) {
          TrackReserved.push(resultFilter);
        }

      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR GETHOURRESERVE: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });;

    // Comprobamos si existe una reserva a la misma hora en la misma pista y fecha 
    await this.reserveDataService.getReservesForTrackDate(reserve.track, reserve.date)
      .toPromise().then(result => {

        let resultFilter = result.filter(function (filterReserve) {
          if (filterReserve.hour === reserve.hour) {
            return filterReserve.hour;
          }
        });

        if (resultFilter.length != 0) {
          TrackReserved.push(resultFilter);
        }

      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR GETRESERVE: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });;

    // Si no hay ninguna pista que interseccione a esa hora o la misma pista esté ocupada a esa hora, permite reservarla
    if (TrackReserved.length != 0) {
      return false;
    } else {
      return true;
    }
  }

  // Metodo que se usa cada vez que se hacemos click en el botón Opiniones para mostrar u ocultar el panel de opiniones.
  readComment() {
    if (this.closeComment) {
      this.closeComment = false;
    } else {
      this.closeComment = true;
    }

    let listCommentsElement = document.getElementById('comments');
    //Si la clase está en el elemento, la elimina, sino, la añade.
    listCommentsElement.classList.toggle('openComment');
    listCommentsElement.classList.toggle('closeComment');


    let containerComment = document.getElementById('containerComment');
    containerComment.classList.toggle('moveButtonOpen');
    containerComment.classList.toggle('moveButtonClose');

  }

  // Metodo usado para cargar y filtrar las opiniones
  async loadComment() {
    this.listComments = [];
    this.listCommentsEmpty = true;
    this.listComments = await this.commentDataService.getComments(this.selectTrack)
      .toPromise()
      .catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR GETCOMMENTS: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });;

    //.then((result: Comment[]) => {
    //Filtramos la lista a traves del id del Track elegido, mostrando así unicamente las opiniones de la pista seleccionada
    //result.forEach( comment => {
    // console.log(comment);
    //if(comment.track === this.selectTrack.idTrack){
    //this.listComments.push(comment);
    //}
    //});

    if (this.listComments.length != 0) {
      this.listCommentsEmpty = false;
      console.log(this.listComments);
      this.listComments.sort((objA, objB) => {
        return this.orderArrayDate(objA, objB);
      });
    } else {
      this.listCommentsEmpty = true;
    }

    //console.log(result);
    //console.log(this.selectTrack);
    //});
  }

  //Metodo para ordenar las opiniones, de forma que la mas próxima esté primera
  //Primero compara el año, luego el mes y luego el dia
  orderArrayDate(objA, objB) {
    let dateA = objA.date.split('-');
    let dateB = objB.date.split('-');

    let comparativeA = new Date(Number(dateA[2]), Number(dateA[1]), Number(dateA[0]));
    let comparativeB = new Date(Number(dateB[2]), Number(dateB[1]), Number(dateB[0]));
    return comparativeB.getTime() - comparativeA.getTime();
  }

  // Controlador de errores (Validador de datos)
  get errorControl() {
    return this.reserveForm.controls;
  }

}
