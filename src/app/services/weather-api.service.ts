import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class OpenMeteoAPI {

  constructor(private httpClient: HttpClient) { }

  // Método para obtener el clima con coordenadas, fecha y hora específicas
  public getWeatherWithCoord(lat, long, date, hour): Observable<any> {
    // Dividimos la fecha en partes (día, mes, año)
    date = date.split("-");

    // Reorganizamos la fecha en formato YYYY-MM-DD
    date = date[2] + "-" + date[1] + "-" + date[0];

    // Construimos la URI para la solicitud
    let URI_Request = "latitude=" + lat + "&longitude=" + long + "&start_date=" + date + "&end_date=" + date + environment.openMeteoParam;

    // Realizamos una solicitud HTTP GET al servidor de OpenMeteo con la URI construida
    return this.httpClient.get(environment.openMeteoURI + URI_Request);
  }
}
