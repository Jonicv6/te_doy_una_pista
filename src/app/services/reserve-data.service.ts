import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserve } from 'src/models/reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveDataService {
  reserves: []
  constructor(private http: HttpClient) { }

  httpHeader =  new HttpHeaders({
      'Content-Type': 'application/json'
    })
  

  public createReserve(reserve:Reserve): Observable<any> {
    return this.http.post(environment.endPoint + environment.reservePoint, reserve, { headers: this.httpHeader});
  }

  public getReserves(): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint);
  }

  public getReserve(id): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint + id);
  }

  public getReservesForTrackDate(track, date): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint + track + "/" + date);
  }

  public getHourReservesForSportCenterDateType(id, date, type): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint + id + "/" + date + "/" + type);
  }

  public deleteReserve(reserve):Observable<any>{
    return this.http.delete(environment.endPoint + environment.reservePoint + reserve.idReserve);
  }
}
