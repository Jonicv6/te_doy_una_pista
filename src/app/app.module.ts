import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./services/firebase/auth.service";
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '/terms',
  privacyPolicyUrl: '/privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    AngularFirestore,
    GooglePlus,
    StatusBar,
    DatePipe,
    AuthService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],  
  bootstrap: [AppComponent],
})
export class AppModule { };
/*function firebaseUiAuthConfig(firebaseUiAuthConfig: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error("Function not implemented.");
}*/

