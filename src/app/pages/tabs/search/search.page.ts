import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';
import { SportCenter } from 'src/models/sportcenter';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  citys: any[] = [];
  sports: any[] = [];
  sport: string;
  sportCenters: SportCenter[] = [];
  sportCenterData = [];
  init: boolean = true;
  empty: boolean = false;
  city: any;
  env = environment;
  sportAux: any;

  constructor(
    public navCtrl: NavController,
    private sportCenterDataService: SportCenterDataService,
    private trackDataService: TrackDataService,
    private sweetAlertService: SweetAlertService) {

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
          console.log("ERROR GETSPORTCENTERS: " + e.message);
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
          console.log("ERROR GETTRACKS: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });

    //Si todo ha ido bien, cargamos los datos predeterminados guardados en local.
    this.localData();

  }

  async localData() {
    setTimeout(async () => {
      //Busca en los archivos locales Profile, donde guardaremos los datos favoritos del usuario
      if (localStorage.getItem('profile') != null) {
        let dataLocal = await JSON.parse(localStorage.getItem('profile'));
        this.sport = dataLocal['sport'];
        this.city = dataLocal['city'];
      }
      //Una vez cargado ambos, realiza la busqueda por primera vez
      this.search(this.city, this.sport);

    }, 1000);
  }

  /* ------------ Realizamos la búsqueda según los valores elegidos ----------- */
  async search(city, sport) {

    this.sportCenters = [];
    this.sportAux = sport; //Guardamos el valor de deportes

    //Cambiamos los valores de los boolean
    this.init = false;

    //Buscamos los SportCenters según la ciudad y el deporte indicado
    await this.sportCenterDataService.getSportCentersCityAndSport(city, sport)
      .toPromise().then(result => {
        this.sportCenters = result;

        if (this.sportCenters.length == 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }

        //Desactivamos el mensaje de carga
        this.sweetAlertService.loading.dismiss();
      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {
          console.log("ERROR SEARCH: " + e.message);
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.search(city, sport);
        });
      });

  }


  openPage(center) {
    this.navCtrl.navigateForward('tabs/search/forms/' + center.idSportCenter + "/" + this.sportAux);
  }

  initResult() {
  }


}
