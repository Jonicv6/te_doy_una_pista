import { Component, OnInit } from '@angular/core';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SweetAlertService } from 'src/app/services/sweetAlert.service';

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
  profileForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private sportCenterDataService: SportCenterDataService,
    private trackDataService: TrackDataService,
    private formBuilder: FormBuilder,
    private sweetAlertService: SweetAlertService
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9_\\-\\,]+)@([a-zA-Z0-9_\\-\\,]{2,})\.([a-zA-Z]{2,})$')]],
      city: ['', [Validators.required]],
      sport: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    //Activamos el loading y cargamos los datos
    await this.sweetAlertService.presentLoading(environment.textLoading);
    this.sweetAlertService.loading.present();

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
      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR PROFILE: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });

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
      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR PROFILE: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });

    await this.getDataLocal();

    //Paramos el loading
    this.sweetAlertService.loading.dismiss();
  }

  get errorControl() {
    return this.profileForm.controls;
  }

  //Método que guarda a nivel local los datos del usuario
  saveData() {

    //Indicamos el estado para los mensajes de aviso
    if (!this.profileForm.valid) {
      this.sweetAlertService.showAlert(this.env.titleSaveProfileError, this.env.errorSaveProfile, 'error');
      return false;
    } else {
      let profile = { name: this.name, email: this.email, city: this.city, sport: this.sport };

      localStorage.setItem('profile', JSON.stringify(profile));

      this.sweetAlertService.showAlert(this.env.titleSaveProfile, this.env.textSaveProfile, 'success');
    }
  }

  //metodo para leer los datos locales
  async getDataLocal() {
    let dataLocal = await JSON.parse(localStorage.getItem('profile'));
    if (dataLocal != null) {
      this.name = dataLocal['name'];
      this.email = dataLocal['email'];
      this.city = dataLocal['city'];
      this.sport = dataLocal['sport'];
    }
  }

}
