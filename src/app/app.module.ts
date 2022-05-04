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
import { environment } from "src/environments/environment";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseUIModule, firebase, firebaseui } from "firebaseui-angular";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { DxSchedulerModule, DxDataGridModule } from 'devextreme-angular';

import { firebaseConfig } from '../environments/environment';

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
    imports: [
        AngularFireModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseConfig),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ComponentsModule,
        DxSchedulerModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AngularFirestore,
        GooglePlus,
        StatusBar,
        DatePipe,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };


/*function firebaseUiAuthConfig(firebaseUiAuthConfig: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error("Function not implemented.");
}*/

