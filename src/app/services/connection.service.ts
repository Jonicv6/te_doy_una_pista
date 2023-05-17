import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  public loading: any;
  env = environment;

  constructor(
    private loadingCtrl: LoadingController) { }

  public async showErrorConnection(): Promise<boolean> {
    this.loading.dismiss();
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        title: this.env.titleErrorConnection,
        text: this.env.errorConnection,
        icon: 'error',
        heightAuto: false,
        confirmButtonText: this.env.buttonRetry,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 100000
    });
    console.log("Cargando...");
    this.loading.present();
  }
}
