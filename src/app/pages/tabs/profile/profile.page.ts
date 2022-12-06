import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  env = environment;
  name = "SportExample";
  email = "correo@servidor.com";
  city = "";
  sport = "";
  citys: any[] = [];
  sports: any[] = [];
  loading: any;

  constructor(
    private sportCenterDataService: SportCenterDataService,
    private loadingCtrl: LoadingController,
    private trackDataService: TrackDataService
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    //Activamos el loading y cargamos los datos
    await this.presentLoading(environment.textLoading);
    this.loading.present();

    //Extraemos las ciudad de los SportCenters
    await this.sportCenterDataService.getSportCenters()
      .toPromise().then(result => {
        //Recorremos los datos 
        for (let i of result) {
          //Si la ciudad está repetida, se descarta
          if (!this.citys.includes(i.city)) {
            this.citys.push(i.city);
            //console.log(i.city);
          }
        };
        this.city = this.citys[0];
      }).catch((e) => {
        console.log("TERMINADO ERROR: " + e);
      });;

    //Leemos los deportes que existen
    await this.trackDataService.getTracks()
      .toPromise().then(result => {
        for (let i of result) {
          let auxiliar = i.sport.split("-");
          auxiliar.forEach(element => {
            if (!this.sports.includes(element)) {
              this.sports.push(element);
            }
          });
        }
        this.sport = this.sports[0];
      });
    
    await this.getDataLocal();

    //Paramos el loading
    this.loading.dismiss();
  }


  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 100
    });
  }

  //Método que guarda a nivel local los datos del usuario
  saveData(){
    let profile = { name: this.name, email: this.email, city: this.city, sport: this.sport };

    localStorage.setItem('profile', JSON.stringify(profile));

    Swal.fire({
      title: this.env.titleSaveProfile,
      text: this.env.textSaveProfile,
      icon: 'success',
      heightAuto: false,
    });
  }

  //metodo para leer los datos locales
  async getDataLocal() {
    let dataLocal = await JSON.parse(localStorage.getItem('profile'));
    this.name = dataLocal['name'];
    this.email = dataLocal['email'];
    this.city = dataLocal['city'];
    this.sport = dataLocal['sport'];
  }

}
