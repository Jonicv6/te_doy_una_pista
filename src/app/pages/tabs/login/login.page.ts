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
import { LoadOptions } from 'devextreme/data';
import { Appointment } from 'devextreme/ui/scheduler';
import { NavController } from '@ionic/angular';
import { getToken } from 'firebase/app-check';
import { browserLocalPersistence, browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut } from "firebase/auth";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  //gapi = globalThis.gapi;

  dataCalendar: datosCalendario[];
  //currentDate: Date = new Date(2022, 4, 10);

  picture: string = null;
  name: string = null;
  email: string = null;
  env = environment;
  employeesDataSource: DataSource<any, any> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private http: HttpClient,
    public navCtrl: NavController,
    public serviceCalendar: ServiceCalendar,
    public auth: AuthService) {
    firebase.initializeApp(firebaseConfig);
  };

  user$: Observable<firebase.User>;

  loginGoogle() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.isSignedIn.listen(isSignedIn => {
      if (isSignedIn) {
        const currentUser = auth2.currentUser.get();
        const authResponse = currentUser.getAuthResponse(true);
        authResponse.id_token;
        authResponse.access_token;

        const credential = firebase.auth.GoogleAuthProvider.credential(
          authResponse.id_token,
          authResponse.access_token
        )
        firebase.auth().signInWithCredential(credential);
      }
    });

    
  }

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    //Recibimos los datos de Firebase
    const auth = getAuth();
    //Filtramos los datos al usuario activo.
    let userActive = auth.currentUser;

    console.log("AUTH: ");
    console.log(userActive);

    if (userActive != null) {
      //this.router.navigateByUrl('tabs/calendar');
      this.navCtrl.navigateForward('tabs/calendar');
    }

  }

  loginGoogle_2() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...

        this.navCtrl.navigateForward('tabs/calendar');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  loginGoogle2() {
    //alert("DENTRO GOOGLE");
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/calendar");


    gapi.load('client:auth2', async () => {
      gapi.client.init({
        apiKey: firebaseConfig.apiKey,
        clientId: firebaseConfig.client_id,
        discoveryDocs: firebaseConfig.discoveryDocs,
        scope: firebaseConfig.scope

      });

      //Popup que realiza el Login
      await gapi.auth2.getAuthInstance().signIn();
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log("AUTH_LOGIN: ");
        console.log(getAuth().currentUser);
        localStorage.setItem("userActive", JSON.stringify(getAuth().currentUser));
        console.log('Cliente cargado')
        var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        //console.log(profile);
        let user = {
          email: profile.getEmail(),
          name: profile.getName(),
          clave: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
        }

        console.log("AUTH_LOGIN: ");
        console.log(gapi.auth2.getAuthInstance().currentUser.get());
        localStorage.setItem("userActive", JSON.stringify(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()));
      }

      console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
      this.navCtrl.navigateForward('tabs/calendar');

    });

  }


}
