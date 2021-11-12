import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReserveDataService } from 'src/app/services/reserve-data.service';
import { environment } from 'src/environments/environment';
import { ReserveLocal } from 'src/models/reserveLocal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve',
  templateUrl: 'reserve.page.html',
  styleUrls: ['reserve.page.scss']
})
export class ReservePage {

  listReserves: ReserveLocal[] = [];
  env = environment;
  today = new Date().toLocaleDateString('en-US');
  actualHour: string = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  constructor(
    private reserveDataService: ReserveDataService,
    private datepipe: DatePipe) {
      this.today = this.datepipe.transform(this.today, 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.getDataLocal();
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
        if (this.listReserves.includes(reserve)) {
          //Borramos la reserva de la lista
          let index = this.listReserves.indexOf(reserve);
          this.listReserves.splice(index, 1);
          //Actualizamos la lista en local
          localStorage.setItem('reserves', JSON.stringify(this.listReserves));
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

  doRefresh(event) {
    this.getDataLocal();
    //Cuando finalice la lectura de datos, cancelamos el refresh.
    event.target.complete();

  }

  //metodo para leer los datos locales
  async getDataLocal() {
    this.listReserves = await JSON.parse(localStorage.getItem('reserves'));
    await this.orderReserves();

    this.listReserves.forEach(reserve => {
      let reserveDate = reserve.date.split("-");
      let todayDate = this.today.split("-");


      // TODO: ARREGLAR FORMULA PARA CAMBIAR TARJETA DE RESERVA 
      if (reserve.date == this.today){
        reserve.time = 0;
      } else if(
        //EXPLICACION: Dia menor pero mismo mes y año - Mes menor pero mismo año - Año menor
        (reserveDate[0]<todayDate[0] && reserveDate[1]==todayDate[1] && reserveDate[2]==todayDate[2]) || 
        (reserveDate[1]<todayDate[1] && reserveDate[2]==todayDate[2] ) || 
        (reserveDate[2]<todayDate[2]) || (reserve.date == this.today && reserve.hour[0] <= this.actualHour[0])){
        console.log ("RESERVA: "+reserve.date +" - TODAY: "+this.today+" - RESERVE HOUR: "+reserve.hour+" - HOUR: "+this.actualHour )

        reserve.time = -1;
      }else{
        reserve.time = 1;
      }
    });
  }

  orderReserves(){
    this.listReserves.sort((a:ReserveLocal, b:ReserveLocal) => {

      //Reformulamos las variables de fecha 
      let arrayA = a.date.split('-');
      let arrayB = b.date.split('-');
      //Se comparan las fechas con la siguiente forma -> yyyy-MM-DDThh:mm
      return +new Date(arrayA[2]+"-"+arrayA[1]+"-"+arrayA[0]+"T"+a.hour) - +new Date(arrayB[2]+"-"+arrayB[1]+"-"+arrayB[0]+"T"+b.hour)
    }).reverse();
  }



}
