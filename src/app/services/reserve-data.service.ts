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
  
  // Método para crear una reserva
  public createReserve(reserve:Reserve): Observable<any> {
    return this.http.post(environment.endPoint + environment.reservePoint, reserve, { headers: this.httpHeader});
  }

  // Método para obtener todas las reservas
  public getReserves(): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint);
  }

  // Método para obtener una reserva específica por su ID
  public getReserve(id): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint + id);
  }

  // Método para obtener las reservas para una pista y una fecha específica
  public getReservesForTrackDate(track, date): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint + track + "/" + date);
  }
  
  // Método para obtener las reservas por hora para un centro deportivo, una fecha y un tipo específico
  public getHourReservesForSportCenterDateType(id, date, type): Observable<any> {
    return this.http.get(environment.endPoint + environment.reservePoint + id + "/" + date + "/" + type);
  }

  // Método para eliminar una reserva
  public deleteReserve(reserve):Observable<any>{
    return this.http.delete(environment.endPoint + environment.reservePoint + reserve.idReserve);
  }
}
