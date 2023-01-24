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
  listReservesCompletedObservable: BehaviorSubject<ReserveLocal[]>;

  constructor(
  public navCtrl: NavController,
  private reserveDataService: ReserveDataService,
  private datepipe: DatePipe) {
  this.today = this.datepipe.transform(this.today, 'dd-MM-yyyy'); }

  ngOnInit() {
  }

  ionViewWillEnter(){
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
        }
      }
    })
  }

  commentInfoMeter(reserve){

  }

  commentReserve(reserve){
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
    await this.orderReserves();

    list.forEach(reserve => {
      let reserveDate = reserve.date.split("-");
      let todayDate = this.today.split("-");


      // TODO: ARREGLAR FORMULA PARA CAMBIAR TARJETA DE RESERVA 
      if (reserve.date == this.today) {
        reserve.time = 0;
        this.listReservesPending.push(reserve);
      } else if (
        //EXPLICACION: Dia menor pero mismo mes y año - Mes menor pero mismo año - Año menor
        (reserveDate[0] < todayDate[0] && reserveDate[1] == todayDate[1] && reserveDate[2] == todayDate[2]) ||
        (reserveDate[1] < todayDate[1] && reserveDate[2] == todayDate[2]) ||
        (reserveDate[2] < todayDate[2]) || (reserve.date == this.today && reserve.hour[0] <= this.actualHour[0])) {

        this.listReservesPending.push(reserve);
        console.log("RESERVA: " + reserve.date + " - TODAY: " + this.today + " - RESERVE HOUR: " + reserve.hour + " - HOUR: " + this.actualHour);
        reserve.time = -1;
      } else {
        reserve.time = 1;

        this.listReservesCompleted.push(reserve)
      }
    });
    this.listReservesCompletedObservable = new BehaviorSubject(this.listReservesCompleted);
    this.listReservesPendingObservable = new BehaviorSubject(this.listReservesPending);
    console.log("LISTRESERVES:");
    console.log(this.listReservesPending);
    console.log("LISTRESERVESCOMPLETED:");
    console.log(this.listReservesCompleted);
  }

  //Metodo para ordenar las reserva, de forma que la mas próxima esté primera
  orderReserves(){
    this.listReservesPending.sort((a: ReserveLocal, b: ReserveLocal) => {

      //Reformulamos las variables de fecha 
      let arrayA = a.date.split('-');
      let arrayB = b.date.split('-');

      //Se comparan las fechas con la siguiente forma -> yyyy-MM-DDThh:mm
      return +new Date(arrayA[2] + "-" + arrayA[1] + "-" + arrayA[0] + "T" + a.hour) - +new Date(arrayB[2] + "-" + arrayB[1] + "-" + arrayB[0] + "T" + b.hour)
    });
  }

  showFuture(){
    console.log("ShowFuture");
    this.checkReserveFuture=true;
    this.checkReservePast=false;
  }

  showPast(){
    console.log("ShowPast");
    this.checkReserveFuture=false;
    this.checkReservePast=true;
  }


  openModal(id: string) {
    //this.modalService.open(id);
  }

  closeModal(id: string) {
    //this.modalService.close(id);
  }



}
