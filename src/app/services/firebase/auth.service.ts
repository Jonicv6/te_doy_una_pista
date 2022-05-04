import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { firebaseConfig } from 'src/environments/environment';

import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root',
})
/*export class AuthService {
  CLIENT_ID = '';
  API_KEY = '';

  DISCOVERY_DOC= 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

  SCOPES = '';

  tokenClient;
  gapiInited = false;
  gisInited = false;


  gapiLoaded(){
    gapi.load('client', this.initializeGapiClient);
    
  }
  

  async initializeGapiClient() {
    await gapi.client.init({
      apiKey: firebaseConfig.apiKey,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
    this.gapiInited = true;
    this.maybeEnableButtons();
  }


  maybeEnableButtons() {
    if (this.gapiInited && this.gisInited) {
      //document.getElementById('authorize_button').style.visibility = 'visible';
    }
  }
}


*/
/* COPIA DE SEGURIDAD
*/
export class AuthService {
  user$: Observable<firebase.User>;
  calendarItems: any [];
  gapi = globalThis.gapi;

  constructor(public afAuth: AngularFireAuth) {
    //this.initLogin();
    //this.user$ = afAuth.authState;
  }

  initLogin() {
    this.gapi.load('client', () => {
      console.log('Cliente cargado')

      this.gapi.client.init({
        apiKey:  firebaseConfig.apiKey,
        clientId: "702844795474-sptsblpjbe4nciq0qb577516s6tpni38.apps.googleusercontent.com",
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar' 
      
      });


      this.gapi.client.load('calendar', 'v3', () => {console.log('Calendario cargado')});
    })
    throw new Error('Method not implemented.');
  }

  async login(){
    const googleAuth =  this.gapi.auth.authorize.arguments.getAuthInstance();
    const googleUser =  await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser);

    const credential =  firebase.auth.GoogleAuthProvider.credential(token);

    await this.afAuth.signInAndRetrieveDataWithCredential(credential);
  }

  async getCalendar(){
    const events = await  this.gapi.client.request.arguments.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });

    console.log(events);

    this.calendarItems = events.result.items;

  }
  
}
