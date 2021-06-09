import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReserveLocal } from 'src/models/reserveLocal';

@Component({
  selector: 'app-reserve',
  templateUrl: 'reserve.page.html',
  styleUrls: ['reserve.page.scss']
})
export class ReservePage {

  listReserves: ReserveLocal[] = [];
  env = environment;
  
  constructor() {
    



  }

  ngOnInit() {
    this.listReserves = JSON.parse(localStorage.getItem('reserves'));
    console.log(this.listReserves)
  }


}
