import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Track } from 'src/models/track';

@Injectable({
  providedIn: 'root'
})
export class TrackDataService {

  tracks: [];
  private _track: Track;

  constructor(private http: HttpClient) { }

  private setTrack(value: Track) {
    this._track = value;
  }

  // Método para obtener todas las pistas
  public getTracks(): Observable<any> {
    return this.http.get(environment.endPoint + environment.trackPoint);
  }
  // Método para obtener una pista específica por su ID
  public getTrack(id): Observable<any> {
    return this.http.get(environment.endPoint + environment.trackPoint + id);
  }
  // Método para obtener las pistas de un centro deportivo y un deporte específicos
  public getTrackSportCenter(id, sport): Observable<any> {
    return this.http.get(environment.endPoint + environment.trackPoint + id + "/" + sport);
  }

}