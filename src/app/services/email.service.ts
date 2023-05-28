import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from 'src/models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  public sendMail(email: Email): Observable<any> {
    try {
      
      //console.log(email);
      return this.http.post(environment.endPoint + environment.nodemailerPoint, email, { headers: this.httpHeader });
    } catch (error) {

      console.log("ERROR SERVICE: " + error);
    }
  }

}
