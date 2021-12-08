import { Component } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {

  constructor(
    //private afAuth: AngularFireAuth,
    private platform: Platform,
    private googlePlus: GooglePlus
  ) {}

  picture:string;
  name:string;
  email:string;

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  async loginGoogleAndroid() {
    const res = await this.googlePlus.login({
      'webClientId': "702844795474-sbh3uc19otjoi43n1esknkgmq431l1j5.apps.googleusercontent.com",
      'offline': true
    });
    /*const resConfirmed = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
    const user = resConfirmed.user;
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;*/
  }

  async loginGoogleWeb() {
    /*const res = await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.picture = user.photoURL;
    this.name = user.displayName;
    this.email = user.email;*/
  }
  

}
