import { Injectable } from '@angular/core';
import { SportCenter } from '../../models/sportcenter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from 'src/models/track';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportCenterDataService {
  sportCenters: [];
  private _sportCenter: SportCenter;

  constructor(private http: HttpClient) { }

  private setSportCenters(data) {
    this.sportCenters = data;
  }

  public getSportCenters(): Observable<any> {
    return this.http.get(environment.endPoint + environment.sporcenterPoint);
  }

  private setSportCenter(data) {
    this._sportCenter = data;
  }

  public getSportCenter(id): Observable<SportCenter> {
    return this.http.get<SportCenter>(environment.endPoint + environment.sporcenterPoint + id);
  }

  public getSportCentersCityAndSport(city, sport): Observable<any> {
    return this.http.get(environment.endPoint + environment.sporcenterPoint + city + "/" + sport);
  }

}
