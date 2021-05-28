import { Component, OnInit, Input, ɵɵNgOnChangesFeature } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SendParamsService } from 'src/app/services/send-params.service';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';
import { SportCenter } from 'src/models/sportcenter';
import { Track } from 'src/models/track';
import { resolve } from 'url';

//@Input() sportCenter:any;
@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  sportCenter: SportCenter;
  sport: any;
  tracks: Track[] = [];
  defaultHours: any[] = environment.hoursOpen;
  hours: any[] = [];
  hoursEmpty: boolean = false;
  day: string = new Date().toLocaleString().split(" ")[0];
  actualHour: string = new Date().toLocaleString().split(" ")[1].split(":")[0];
  selectTrack: Track;
  env = environment;
  sportCenterName: string; 


  constructor(private activedRoute: ActivatedRoute,
    public getParams: SendParamsService,
    private trackDataService: TrackDataService,
    private sportCenterDataService: SportCenterDataService) {
    /*
    //Recogemos los datos enviados desde la página Search
    let id = this.activedRoute.snapshot.params['id'];

    //TODO: CAPTURAR DATOS DE LA BBDD DEL SPORTCENTER SEGUN LA ID
    //ASI CUANDO HAGAN UN F5 SE MANTIENE LOS DATOS.
    this.sportCenterDataService.getSportCenter(id).subscribe(data => {
      console.log(data)
      this.sportCenter = data;
    });*/


    //Recorremos las diversas pistas
    /*this.trackDataService.getTracks()
      .subscribe(result => {
        for (let i of result) {
          if (i.sportCenter === this.sportCenter.idSportCenter) {
            let auxiliar = i.sport.split("-");
            auxiliar.forEach(element => {
              if (element === this.sport) {
                this.tracks.push(i);
              }
            });
          }
        }
      });*/
    /*this.getarams.$getObjectSource.subscribe(data => {
      this.sportCenter = data[0];
      this.sport = data[1];

    });*/


  }

   ngOnInit() {
     console.log("INIT")
    this.getData();
    
    //Realizamos el Split porque la fecha se imprime: 2021-03-18T02:04:44.746Z
    //CORREGIRLO 
    document.getElementById("datePicker").setAttribute("min", this.day);
    console.log(this.day)
    this.activeHour(this.day)
  }

  async getData(){
    //Recogemos los datos enviados desde la página Search
    let id = this.activedRoute.snapshot.params['id'];
    this.sport = this.activedRoute.snapshot.params['sport'];
    //TODO: CAPTURAR DATOS DE LA BBDD DEL SPORTCENTER SEGUN LA ID
    //ASI CUANDO HAGAN UN F5 SE MANTIENE LOS DATOS.
   await this.sportCenterDataService.getSportCenter(id).toPromise().then(r=>{
    
    this.sportCenter = r;
    //Por fallo en la variable, debo de usar una exclusiva para el titulo
    this.sportCenterName = this.sportCenter.name;
    });

    await this.trackDataService.getTrackSportCenter(id, this.sport)
      .toPromise().then(result => {
        this.tracks = result;
        console.log(this.tracks)
      });
  }


  changeTrack() {
    //this.selectTrack = $event.target.value;
    console.log(this.selectTrack)

  }

  /* --------------- Horas restantes con un margen de dos horas --------------- */
  activeHour(selectDay) {

    this.trackDataService.getReseves()
      .subscribe(result => {
        this.hours = []
        //Rellenamos la variable hours
        for (let hour of this.defaultHours) {
          if (this.day == selectDay && Number.parseInt(hour) >= Number.parseInt(this.actualHour.toString()) + 2) {
            this.hours.push(hour);
          } else {
            this.hours.push(hour);
          }
        }
        console.log(this.actualHour.toString())
        console.log(this.hours)

        for (let i of result) {

        }

        if (this.hours.length == 0) {
          this.hoursEmpty = true;
        } else {
          document.getElementById("hourPicker").setAttribute("disabled", 'false');
          document.getElementById("hourPicker").style.color = "white";
          document.getElementById("hourPicker").style.opacity = "inherit";
        }
      });

  }


  //COMPLETAR
  //Capturar valor de Track 
  //Realizar metodo que al seleccionar dia, se activa las horas libres correspondiente
  //Prohibir seleccionar fechas anteriores a hoy  -- HECHO
  //Prohibir horas anteriores a la actual+1hora 

}
