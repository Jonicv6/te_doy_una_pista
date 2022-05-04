import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { environment, firebaseConfig } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { AuthService } from 'src/app/services/firebase/auth.service';

import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { datosCalendario, ServiceCalendar } from 'src/app/services/datosCalendario.service';
import { getEventListeners } from 'events';


@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})

export class CalendarPage implements OnInit {

  gapi = globalThis.gapi;

  dataCalendar: any = null;
  //currentDate: Date = new Date(2022, 4, 10);

  picture: string = null;
  name: string = null;
  email: string = null;
  env = environment;
  checkLogin: boolean = false;
  employeesDataSource: DataSource<any, any> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    private serviceCalendar: ServiceCalendar,
    public auth: AuthService) {

    //console.log(this.dataCalendar);
    //this.dataCalendar = this.serviceCalendar.getDatos();

    //console.log("CONSTRUCTOR: "+this.dataSource);
  };



  ngOnInit() {
    this.checkUser();
  }

  getDisplayExpr(item) {
    return item && item.text;
  }

  async loginGoogle() {
    //alert("DENTRO GOOGLE");

    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log("RES: " + res.user.uid);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;

    this.checkUser();

    this.dataCalendar = this.serviceCalendar.getDatos();
    console.log("login: " + this.dataCalendar[0].startDate);

    //this.getCalendar(res.user.uid);
  }

  /*async getCalendar(calendarID: any) {
    this.dataCalendar = new DataSource({
      store: new CustomStore({
        load: async (options) => this.getData(options, { showDeleted: false }, calendarID),

      })
    });

    console.log(this.dataCalendar);
  }*/


  pruebaGapi() {
    gapi.load('client', () => {
      console.log('Cliente cargado')

      gapi.client.init({
        apiKey: "AIzaSyAgkpKuy49LY1GFOHCCnVP6a-zsjjgBjuM",
        clientId: "702844795474-sptsblpjbe4nciq0qb577516s6tpni38.apps.googleusercontent.com",
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'

      });

      this.checkLogin=true; //TODO: TEMPORAL

      gapi.client.load('calendar', 'v3', this.listUpComingEvents);//() => { console.log('Calendario cargado') });

      /*this.gapi.auth.authorize({
        client_id: "702844795474-sptsblpjbe4nciq0qb577516s6tpni38.apps.googleusercontent.com",
        scope: 'https://www.googleapis.com/auth/calendar',
        immediate: true,
      }, () => {
    });*/

    });
  }



  listUpComingEvents(){
    
   
  var request = gapi.client['calendar'].calendarList.list({
      'calendarId': 'primary', /* Can be 'primary' or a given calendarid */
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime' 
    });
  
    request.execute(function (resp) { 
      console.log("LIST UP CALENDAR");
      if (!resp.error) {
        var calendarIds = [];
        for (var i = 0; i < resp.items.length; i++) {
          calendarIds.push(resp.items[i].id);
        }
        this.getEvents(calendarIds);
        this.checkLogin=true;
      }
      else {
        console.log(resp.error);
      }
    });
    
  }


  getEvent(calendarIds){
    var events = [];
    var deferred;
    for(var i = 0; i < calendarIds.length; i++) {
      // bind i to function to allow asynchronous functions inside for loop
      (function(cntr) {
        var request = this.gapi.client['calendar'].events.list({
          calendarId: calendarIds[i]
        });

        request.execute(function(resp) {
            if(!resp.error) {
              for(var j = 0; j < resp.items.length; j++) {
                console.log(j);
                events.push(resp.items[j]);
              }
            }
            else {
              console.log(resp.error);
            }
        });
      })(i);
    }
    console.log(events);
    
  }

  logoutGoogle(){

    this.name = undefined;
    this.email = undefined;
    this.checkUser();
  }

  checkUser() {
    if (this.email != undefined && this.name != undefined) {
      this.checkLogin = true;
    } else {
      this.checkLogin = false;
    }

    console.log("Login Email: " + this.email);
  }


  private getData(options: any, requestOptions: any, calendarID: any) {
    const PUBLIC_KEY = firebaseConfig.apiKey;
    const CALENDAR_ID = calendarID; //'UJzfH4mQcBS2ISjHPd1ufV44LtF3';//calendarID;//'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';
    const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
      CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

    return this.http.get(dataUrl, requestOptions).pipe((data: any) => data.items);
  }



  /* var provider = new firebase.auth.GoogleAuthProvider();
   provider.addScope('profile');
   provider.addScope('email');
   //this.afAuth.signInWithRedirect(provider);
   this.afAuth.signInWithPopup(provider).then(function(result) {
     // This gives you a Google Access Token.
     var token = result.credential;
     // The signed-in user info.
     var user = result.user;
     });


   /*this.authService.loginWithGoogle().then(() => {
     this.router.navigate(['/tabs']);

   }).catch(err => {
     alert('los datos son incorrectos o no existe el usuario');
   })*/




  //TEMPORAL
  /*const auth = getAuth();
  getRedirectResult(auth)
  .then((result) => {
  // This gives you a Google Access Token. You can use it to access Google APIs.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;

  // The signed-in user info.
  const user = result.user;
  }).catch ((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });*/





}
