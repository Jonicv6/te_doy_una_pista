import { Injectable } from '@angular/core';
import { SportCenter } from '../../models/sportcenter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportCenterDataService {
  sportCenters: [];
  private _sportCenter: SportCenter;

  /* ----------------------------- Constructor WEB ---------------------------- */

  constructor(private httpClient: HttpClient) { }
  private setSportCenters(data) {
    this.sportCenters = data;
  }

  // Método para obtener todos los centros deportivos
  public getSportCenters(): Observable<any> {
    return this.httpClient.get(environment.endPoint + environment.sporcenterPoint);
  }

  // Método privado utilizado para asignar un valor al centro deportivo
  private setSportCenter(data) {
    this._sportCenter = data;
  }

  // Método para obtener un centro deportivo específico por su ID
  public getSportCenter(id): Observable<SportCenter> {
    return this.httpClient.get<SportCenter>(environment.endPoint + environment.sporcenterPoint + id);
  }

  // Método para obtener los centros deportivos de una ciudad y deporte específicos
  public getSportCentersCityAndSport(city, sport): Observable<any> {
    return this.httpClient.get(environment.endPoint + environment.sporcenterPoint + city + "/" + sport);
  }



  /* ------------------------- Constructor IOS/ANDROID ------------------------ */
  /*
  constructor(private http: HTTP){}

  private setSportCenters(data) {
    this.sportCenters = data;
  }

  public getSportCenters(){
    return this.http.get(environment.endPoint + environment.sporcenterPoint, null, null);
  }

  private setSportCenter(data) {
    this._sportCenter = data;
  }

  public getSportCenter(id) {
    return this.http.get(environment.endPoint + environment.sporcenterPoint, id,null);
  }

  public getSportCentersCityAndSport(city, sport) {
    return this.http.get(environment.endPoint + environment.sporcenterPoint, [city,sport], null);
  }
  */

}
