import { Component, ViewChild, OnInit, AfterContentInit, ElementRef } from '@angular/core';
import { SportCenterDataService } from '../../../services/sport-center-data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';
import { TrackDataService } from 'src/app/services/track-data.service';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';

declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: 'maps.page.html',
  styleUrls: ['maps.page.scss']
})

export class MapsPage implements OnInit, AfterContentInit {

  map: any;
  infoWindows: any = [];
  sportCenters: any = [];
  latitude_ubication: any;
  longitude_ubication: any;
  sports: any[] = [];
  init: boolean = true;
  sport: any = null;
  env = environment
  permissionDenied: boolean = false;

  @ViewChild('mapElement', { read: ElementRef, static: false }) mapElement: ElementRef;


  constructor(
    private geolocation: Geolocation,
    private sportCenterDataService: SportCenterDataService,
    private trackDataService: TrackDataService,
    private sweetAlertService: SweetAlertService) {

  }

  ngAfterContentInit(): void {
    //throw new Error("Method not implemented.");
  }

  ionViewDidEnter() {
  }

  ngOnInit() {
    //Primero descargamos los deportes que contiene la base de datos
    this.getData();

  }

  async getData() {
    //Activamos el loading y cargamos los datos
    console.log("GET DATA");
    await this.sweetAlertService.presentLoading(environment.textLoading);
    //Leemos la lista de deportes
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
      }).catch(async (e) => {
        await this.sweetAlertService.showErrorConnection().then(() => {

          console.log("ERROR MAPS: " + e.message);

          this.sweetAlertService.loading.dismiss();
          //Una vez finaliza la muestra del error, vuelve a intentar cargar
          this.getData();
        });
      });

    //Primero busca en los archivos localos los datos del perfil
    //En caso de no tener valores guardados, carga el mapa indicando que debe de seleccionar un deporte.    
    this.getDataLocal();
  }


  async getDataLocal() {
    //Presenta el texto de carga
    console.log("GET DATALOCAL");
    setTimeout(async () => {
      //Busca en los archivos locales Profile, donde guardaremos los datos favoritos del usuario
      if (localStorage.getItem('profile') != null) {
        let dataLocal = await JSON.parse(localStorage.getItem('profile'));
        this.sport = dataLocal['sport'];
      }

      //En caso de que ese fichero no existe, carga el mapa sin ningún deporte seleccionado.
      if (this.sport == null) {
        this.showMap();
      }

      //Desactivamos el mensaje de carga
      console.log("GET DATALOCAL-CLOSED");
      this.sweetAlertService.loading.dismiss();
    }, 4000);

  }

  //Este metodo es llamado cada vez que se modifica el valor del deporte en el Select del mapa
  changeSport(sport) {
    this.sportCenters = [];
    console.log("CHANGE SPORT");
    this.sweetAlertService.presentLoading(environment.textLoading);
    setTimeout(() => {
      //Consultamos a la base de datos y obtenemos la ubicación
      // de todos los lugares disponibles para hacer deporte 
      this.sportCenterDataService.getSportCenters()
        .toPromise().then(result => {
          this.trackDataService.getTracks()
            .subscribe(resultTrack => {
              resultTrack.filter(item => {
                let sports = item.sport.split("-");

                for (let auxList of result) {
                  //Condicion:
                  /*Si el deporte está en la lista de las pistas de la lista de pabellones y que no se repita por pabellon */
                  if (sports.indexOf(sport) != -1 &&
                    auxList.idSportCenter === item.sportCenter &&
                    this.sportCenters.indexOf(auxList) == -1) {
                    //console.log(item.idTrack + " " + sports.indexOf(sport) + " " + sport)
                    this.sportCenters.push(auxList);
                  };
                }
              });
              //Recargarmos el mapa con los nuevos datos
              this.showMap();
            });
        }).catch(async (e) => {
          await this.sweetAlertService.showErrorConnection().then(() => {
            console.log("ERROR MAPS: " + e.message);
            //Una vez finaliza la muestra del error, vuelve a intentar cargar
            this.getData();
          });
        });;
      console.log("CHANGE SPORT - CLOSED");
      this.sweetAlertService.loading.dismiss();
    }, 1500);

  }


  //Métodos necesarios para visualizar el mapa correctamente
  showMap() {
    //Variable que usaremos para controlar el mensaje en pantalla de permisos denegados
    this.permissionDenied = false;

    console.log("MAPS: ");
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude_ubication = resp.coords.latitude;
      this.longitude_ubication = resp.coords.longitude;
      //Capturamos la posicion actual
      const pos = {
        lat: this.latitude_ubication,
        lng: this.longitude_ubication
      };

      //Introducimos los datos de configuracion del mapa
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: pos,
          zoom: 8,
          streetViewControl: false //Desactivamos el modo Street View
        });


      const ubicate = {
        url: environment.iconMapURL,
        scaledSize: new google.maps.Size(50, 50),
      };
      //Marca de posicion actual
      let mapMarker = new google.maps.Marker({
        position: pos,
        title: "You are here",
        latitude: this.latitude_ubication,
        longitude: this.longitude_ubication,
        icon: ubicate
      });
      mapMarker.setMap(this.map);

      //Mensaje de la posicion actual
      const infoWindowUbicate = new google.maps.InfoWindow;

      infoWindowUbicate.setPosition(pos);
      infoWindowUbicate.setContent(environment.textHere);
      infoWindowUbicate.open(this.map);

      this.map.setCenter(pos); //Centramos el mapa en la ubicación actual

      if (this.sportCenters.length != 0) {
        this.addMarkersToMap(this.sportCenters);   //Añadimos las marcas de posición de los lugares
      }
    }).catch(async (e) => {
      switch (e.code) {

        //Code 1 - User denied Geolocation
        //Code 2 - Network error
        case 1:
          await this.sweetAlertService.showAlert(this.env.titleErrorLocation, this.env.errorLocation, "warning");
          this.permissionDenied = true;
          break;

        case 2:
        default:
          await this.sweetAlertService.showErrorConnection().then(() => {
            console.log("ERROR MAPS " + "(CODE: " + e.code + ") Message: " + e.message);
            this.showMap();
          });
          break;
      }

    });;

    //Una vez finalizada la carga, si no ha encontrado ningún pabellón, se notifica al usuario de ello.
    if (this.sportCenters.length == 0 && this.sport != null) {
      //alert(environment.emptySportCenter);
    } else if (this.sport == null) {
      //Sino tiene ningún deporte selecciona, se notificará al usuario de ello
      //alert(environment.selectSportMap);
    }

  }

  //Metodo para añadir marcar de los polideportivos al mapa
  addMarkersToMap(sportCenters) {
    const icon = {
      url: environment.iconSportCenterURL,
      scaledSize: new google.maps.Size(70, 70),
    };
    for (let i of sportCenters) {
      let pos = new google.maps.LatLng(i.latitude, i.longitude);
      let mapMarker = new google.maps.Marker({
        position: pos,
        title: i.name,
        content: i.street + ", " + i.city + " (" + i.province + ")",
        latitude: i.latitude,
        longitude: i.longitude,
        icon: icon
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  //Metodo para introducir información a la ventana del polideportivo cuando se hace click en la marca
  addInfoWindowToMarker(marker) {

    //Damos formato a la ventana del mapa
    let InfoWindowContent = '<div id="content">' +
      '<h3 id="firstHeaading" class="firstHeading">' + marker.title + '</h3>' +
      '<p>' + marker.content + '</p>'
    '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: InfoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }
}
