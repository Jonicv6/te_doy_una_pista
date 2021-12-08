import { Component } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {

  constructor(
    //private afAuth: AngularFireAuth,
    private platform: Platform  ) {}

  picture:string;
  name:string;
  email:string;
  env = environment;
  
  loginGoogle() {
   
  }

  
  

}
