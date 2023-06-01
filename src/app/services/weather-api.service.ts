import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class OpenMeteoAPI {  

  constructor(private httpClient: HttpClient) { }

  public getWeatherWithCoord(lat,long,date,hour): Observable<any> {
    date = date.split("-");
    date = date[2]+"-"+date[1]+"-"+date[0]; //Ponemos la fecha en formato YYYY-MM-DD
    let URI_Request = "latitude="+lat+"&longitude="+long+"&start_date="+date+"&end_date="+date+environment.openMeteoParam;
    return this.httpClient.get(environment.openMeteoURI + URI_Request);
  }
}
