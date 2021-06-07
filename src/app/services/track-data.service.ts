import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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

  public getTracks(): Observable<any> {
    return this.http.get(environment.endPoint + environment.trackPoint);
  }

  public getTrack(id): Observable<any> {
    return this.http.get(environment.endPoint + environment.trackPoint + id);
  }

  public getTrackSportCenter(id, sport): Observable<any> {
    return this.http.get(environment.endPoint + environment.trackPoint + id + "/" + sport);
  }

}