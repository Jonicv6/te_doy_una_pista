import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { WeatherAPI } from 'src/models/jsonWeather';


@Component({
  selector: 'modal-weather',
  templateUrl: 'modalWeather.html',
  styleUrls: ['../reserve.page.scss']
})
export class ModalWeather {
  env = environment;
  @Input() weatherData: WeatherAPI;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {

    //console.log(this.weatherData);

    // Carga la imagen recibida al abrir el modal 
    let image_weather_icon = document.getElementById('image_Weather');
    image_weather_icon.style.backgroundPosition = this.weatherData.image_weather;
  }

  dismiss() {
    // Usando el injerto del ModalController
    // Usamos "dismiss" para cerrar el modal y devolver los valores
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}

