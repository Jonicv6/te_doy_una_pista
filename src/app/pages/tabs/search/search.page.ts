import { Component } from '@angular/core';
import { Environment } from '@ionic-native/google-maps';
import { LoadingController, NavController } from '@ionic/angular';
import { SendParamsService } from 'src/app/services/send-params.service';
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
  sportCenters: any[] = [];
  sportCenterData = [];
  loading: any;
  init: boolean = true;
  empty: boolean = false;
  sport: SportCenter;
  city: any;
  env = environment;

  constructor(
    public navCtrl: NavController,
    private sportCenterDataService: SportCenterDataService,
    private loadingCtrl: LoadingController,
    private sendParams: SendParamsService,
    private trackDataService: TrackDataService) {

    //Consultamos a la base de datos 
    this.sportCenterDataService.getSportCenters()
      .subscribe(result => {
        //Recorremos los datos 
        for (let i of result) {
          //Si la ciudad está repetida, se descarta
          if (!this.citys.includes(i.city)) {
            this.citys.push(i.city);
            //console.log(i.city);
          }
        };
        this.city = this.citys[0];
      });

    //Leemos los deportes que existen
    this.trackDataService.getTracks()
      .subscribe(result => {
        for (let i of result) {
          let auxiliar = i.sport.split("-");
          auxiliar.forEach(element => {
            if (!this.sports.includes(element)) {
              this.sports.push(element);
            }
          });

        }
        this.sport = this.sports[0];
        this.search(this.city, this.sport);
      });

  }

  ngOnInit() {
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message
      //duration:2000
    });
    await this.loading.present();

  }

  search(city, sport) {
    this.sportCenters = [];

    //Cambiamos los valores de los boolean
    this.init = false;

    //Buscamos los SportCenters según la ciudad y el deporte indicado
    this.presentLoading(environment.textLoading);
    setTimeout(() => {
      this.sportCenterDataService.getSportCentersCityAndSport(city, sport)
        .subscribe(result => {
          this.sportCenters = result;

          if (this.sportCenters.length == 0) {
            this.empty = true;
          } else {
            this.empty = false;
          }
        });
      this.loading.dismiss();
    }, 1500);

  }




  openPage(resultSelect, sport) {
    let params = [resultSelect, sport]
    this.sendParams.sendObjectSource(params);
    this.navCtrl.navigateForward('tabs/search/forms/' + resultSelect.idSportCenter);
  }

  initResult() {
    //this.sportCenters.push("Barrio 512")
  }


}
