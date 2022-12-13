import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentDataService {
  private _comment: Comment;

  constructor(private http: HttpClient) { }

  httpHeader =  new HttpHeaders({
    'Content-Type': 'application/json'
  })

  private setComment(value: Comment) {
    this._comment = value;
  }

  public getComments(): Observable<any> {
    return this.http.get(environment.endPoint + environment.commentPoint);
  }

  public createComment(comment:Comment) {
    return this.http.post(environment.endPoint + environment.commentPoint, comment, { headers: this.httpHeader});
  }

}
