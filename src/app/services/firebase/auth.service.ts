import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) { }

  async onLogin(){
    try {
      return this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error)
    }
  }
}
