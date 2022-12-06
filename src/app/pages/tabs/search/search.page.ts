import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';
import { SportCenter } from 'src/models/sportcenter';

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
  loading: any;
  init: boolean = true;
  empty: boolean = false;
  city: any;
  env = environment;
  sportAux: any;

  constructor(
    public navCtrl: NavController,
    private sportCenterDataService: SportCenterDataService,
    private loadingCtrl: LoadingController,
    private trackDataService: TrackDataService) {

  }

  ngOnInit() {
    console.log("INIT");
    this.getData();
    this.localData();

  }

  async getData() {
    
    console.log("GETDATA");
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

  }


  /* ------------ Realizamos la búsqueda según los valores elegidos ----------- */
  async search(city, sport) {
    
    console.log("SEARCH");
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
      this.loading.dismiss();
      });




  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
      duration: 10000
    });
  }

  async localData() {
    
    console.log("LOCALDATA");
    setTimeout(async () => {
      //Busca en los archivos locales Profile, donde guardaremos los datos favoritos del usuario
      if (localStorage.getItem('profile') != null) {
        let dataLocal = await JSON.parse(localStorage.getItem('profile'));
        this.sport = dataLocal['sport'];
        this.city = dataLocal['city'];
      }
      //Una vez cargado ambos, realiza la busqueda por primera vez
      this.search(this.city, this.sport);

    }, 4000);
  }



  openPage(center) {
    this.navCtrl.navigateForward('tabs/search/forms/' + center.idSportCenter + "/" + this.sportAux);
  }

  initResult() {
  }


}
