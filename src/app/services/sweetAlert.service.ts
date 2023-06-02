import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  public loading: any;
  env = environment;

  constructor(
    private loadingCtrl: LoadingController) { }

  // Método para mostrar una alerta
  public async showAlert(titleAlert, textAlert, typeAlert): Promise<boolean> {
    this.loading.dismiss();
    return new Promise<boolean>((resolve) => {
      // Se muestra una alerta utilizando la biblioteca Swal
      Swal.fire({
        title: titleAlert,
        text: textAlert,
        icon: typeAlert,
        heightAuto: false,
      }).then((result) => {
        // Se resuelve la promesa dependiendo de la acción del usuario en la alerta
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Método para mostrar un mensaje de error de conexión
  public async showErrorConnection(): Promise<boolean> {
    this.loading.dismiss();
    return new Promise<boolean>((resolve) => {
      // Se muestra una alerta de error de conexión utilizando la biblioteca Swal
      Swal.fire({
        title: this.env.titleErrorConnection,
        text: this.env.errorConnection,
        icon: 'error',
        footer: '<a href="'+ this.env.endPoint +'">'+ this.env.textVisitWebEndPoint+'</a>',
        heightAuto: false,
        confirmButtonText: this.env.buttonRetry,
      }).then((result) => {
        // Se resuelve la promesa dependiendo de la acción del usuario en la alerta
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  // Método para mostrar un loading
  public async presentLoading(message: string) {
    // Se crea y muestra un loading utilizando el controlador de loading
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 100000
    });
    console.log("Cargando...");
    this.loading.present();
  }

}
