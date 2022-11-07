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
import { stringify } from 'querystring';
import { LoadingController, NavController } from '@ionic/angular';
import { getAuth, signOut } from "firebase/auth";


@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})

export class CalendarPage implements OnInit {
  //gapi = globalThis.gapi;

  dataCalendar: datosCalendario[];
  //currentDate: Date = new Date(2022, 4, 10);
  loading: any;
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
    public navCtrl: NavController,
    public serviceCalendar: ServiceCalendar,
    private loadingCtrl: LoadingController,
    public auth: AuthService) {
    console.log("CALENDARIO CONSTRUCTOR");
    this.dataCalendar = [];

    console.log(this.dataCalendar);
  };



  ngOnInit() {
    this.checkUser();
  }

  getDisplayExpr(item) {
    return item && item.text;
  }

  //Chequea si el usuario ya se ha logueado
  async checkUser() {

    await this.presentLoading(environment.textLoading);
    this.loading.dismiss().then(() => {

      //Recibimos los datos de Firebase
      const auth = getAuth();
      //Filtramos los datos al usuario activo.
      let userActive = auth.currentUser;

      console.log("AUTH_CALENDAR: ");
      console.log(userActive);

      /*if (localUserActive == null) {
        this.navCtrl.navigateForward('tabs/login');
      } else {
        this.loadEvents();
      }*/
      this.listUpComingEvents();
    });
  }

  //Cierra sesión y se desplaza hacia el login
  logoutGoogle() {
    const auth = getAuth();
    signOut(auth);
    this.router.navigateByUrl('tabs/login').then(() => {
      
      //localStorage.setItem("userActive", "null");
      console.log('Usuario_Desconectado:' + auth.currentUser);
    });;
    //this.listUpComingEvents();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 10000
    });

    return await this.loading.present();
  }


  //Carga los eventos en el calendario
  loadEvents() {
    //alert("DENTRO GOOGLE");
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");
    //this.listUpComingEvents();


    console.log("GAPI LOAD");

    gapi.load('client:auth2', async () => {

      gapi.client.init({
        apiKey: firebaseConfig.apiKey,
        clientId: firebaseConfig.client_id,
        discoveryDocs: firebaseConfig.discoveryDocs,
        scope: firebaseConfig.scope

      });
      console.log("GAPI CLIENT LOAD");
      //gapi.client.load('calendar', 'v3', this.listUpComingEvents);
      //Popup que realiza el Login
      //await gapi.auth2.getAuthInstance().signIn();
      console.log('Cliente cargado')
      console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
      this.checkLogin = true;



      gapi.client.load('calendar', 'v3', this.listUpComingEvents);
    });

  };


  /*async getCalendar(calendarID: any) {
    this.dataCalendar = new DataSource({
      store: new CustomStore({
        load: async (options) => this.getData(options, { showDeleted: false }, calendarID),

      })
    });

    console.log(this.dataCalendar);
  }*/
  /*private getData(options: any, requestOptions: any) {
    const PUBLIC_KEY = firebaseConfig.apiKey;
    const CALENDAR_ID = "jonimarmon@gmail.com";
    const dataUrl = ['https://www.googleapis.com/calendar/v3/calendars/',
    CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

    return this.http.get(dataUrl, requestOptions).toPromise().then((data: any) => data.items);
  }*/

  listUpComingEvents() {
    //Hay que introducir el token obtenido por firebase al GAPI para poder realizar la consultar de los calentarios/eventos
    //Buscar en referencia a la siguiente linea
    //https://stackoverflow.com/questions/53770875/trouble-using-firebase-auth-to-access-google-api-via-gapi-sdk

    let token;
    getAuth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      // ...
      token = idToken;
      console.log(idToken);
    }).catch(function(error) {
      // Handle error
    });
    
    //console.log(parseJs (getAuth().currentUser.getIdTokenResult()));
    console.log(gapi.auth.setToken(token));

    //Recorremos todos los calendarios a los que el usuario esta registrado
    var requestCalendarList = gapi.client['calendar'].calendarList.list({
      'calendarId': 'primary', //Can be 'primary' or a given calendarid 
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then((calendarList) => {
      console.log("Lista de Calendarios");
      console.log(calendarList.result.items);
      let eventos;
      let eventos_aux = [];
      calendarList.result.items.forEach(async (calendar) => {
        eventos = await gapi.client['calendar'].events.list({ calendarId: calendar.id, });
        eventos.result.items.forEach(eventoCalendario => {
          let evento = {
            text: eventoCalendario.summary,
            startDate: eventoCalendario.start.date,
            endDate: eventoCalendario.end.date
          };
          eventos_aux.push(evento);
        });
        //eventos_aux.push(eventos.result.items); SE PUEDE BORRAR
        //console.log(eventos.result.items); SE PUEDE BORRAR
      });
      console.log("Eventos_aux:");
      console.log(eventos_aux);
      this.dataCalendar = eventos_aux;

      //console.log("requestCalendar: ");
      //console.log(requestCalendarList);

      //this.dataCalendar = requestCalendarList;
      //new DataSource(requestCalendarList);
      //this.dataCalendar = this.serviceCalendar.getDatos();//requestCalendarList;
      console.log("Datos calendario: ");
      console.log(this.dataCalendar);

      return eventos_aux;

    });






    /*let req = gapi.client['calendar'].events.list({
      'calendarId': response.result.items[3].id, //* Can be 'primary' or a given calendarid 
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then((resp)=>{
      var events = resp.items;
      
      console.log(events);
          if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
              var event = events[i];
              console.log(event);
              
            }
          } else {
            
          }
    });
    var events = response.result.items;
    console.log(events);*/



    /*let resp_aux;
    let respuesta = false;

    request.execute( (resp) => {
      console.log("LIST UP CALENDAR");
      if (!resp.error) {
        respuesta = true;
        resp_aux = resp;
        let calendarIds = [];
        for (var i = 0; i < resp.items.length; i++) {
          calendarIds.push(resp.items[i].id);
        }
        console.log("CALENDARIO");
        console.log(resp);
        this.Events(calendarIds);
        this.checkLogin = true;
      }
      else {
        console.log(resp.error);
      }
    });
    
    /*if(respuesta){
      let calendarIds = [];
        for (var i = 0; i < resp_aux.items.length; i++) {
          calendarIds.push(resp_aux.items[i].id);
        }
        console.log("CALENDARIO");
        console.log(resp_aux);
        this.Events(calendarIds);
        this.checkLogin = true;
    }*/

  }



  Events(calendarIds) {
    var events = [];
    var deferred;
    for (var i = 0; i < calendarIds.length; i++) {
      // bind i to function to allow asynchronous functions inside for loop
      ((cntr) => {
        var request = gapi.client['calendar'].events.list({
          calendarId: calendarIds[i]
        });

        request.execute((resp) => {
          if (!resp.error) {
            for (var j = 0; j < resp.items.length; j++) {
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
    console.log("Funcion EVENTS");
    console.log(events);

  }








}

