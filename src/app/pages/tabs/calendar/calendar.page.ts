import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';


@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})

export class CalendarPage {

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router) { }

  picture: string;
  name: string;
  email: string;
  env = environment;

  loginGoogle() {
    alert("DENTRO GOOGLE");

    var provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth().signInWithRedirect(provider);
    auth().signInWithPopup(provider).then(function(result) {
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
  }



  #TEMPORAL
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
