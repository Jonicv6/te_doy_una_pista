import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ReserveDataService } from 'src/app/services/reserve-data.service';
import { environment } from 'src/environments/environment';
import { ReserveLocal } from 'src/models/reserveLocal';
import Swal from 'sweetalert2';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';


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

  constructor(
    public navCtrl: NavController,
    private reserveDataService: ReserveDataService,
    private datepipe: DatePipe) {
    this.today = this.datepipe.transform(this.today, 'dd-MM-yyyy');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //Refresca los datos cada vez que la pestaña está en vista activa.
    this.getDataLocal();
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

  }

  commentReserve(reserve) {
    console.log("Completar opinion");
    //this.navCtrl.navigateForward('tabs/search/forms/' + reserve.sportcenter.idSportCenter + "/" + this.sportAux);

  }

  doRefresh(event) {
    this.getDataLocal();
    //Cuando finalice la lectura de datos, cancelamos el refresh.
    event.target.complete();

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
  orderArrayDate(objA, objB){
    let dateA = objA.date.split('-');
    let dateB = objB.date.split('-');

    let comparativeA = new Date(Number(dateA[0]),Number(dateA[1]),Number(dateA[2]));
    let comparativeB = new Date(Number(dateB[0]),Number(dateB[1]),Number(dateB[2]));
    return comparativeA.getTime() - comparativeB.getTime();
  }

  showFuture() {
    console.log("ShowFuture");
    this.checkReserveFuture = true;
    this.checkReservePast = false;
  }

  showPast() {
    console.log("ShowPast");
    this.checkReserveFuture = false;
    this.checkReservePast = true;
  }

  openModal(id: string) {
    //this.modalService.open(id);
  }

  closeModal(id: string) {
    //this.modalService.close(id);
  }



}
