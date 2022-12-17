import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/models/comment';
import { Track } from 'src/models/track';

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

  public getComments(track:Track): Observable<any> {
    return this.http.get(environment.endPoint + environment.commentPoint + track.idTrack);
  }

  public createComment(comment:Comment) {
    return this.http.post(environment.endPoint + environment.commentPoint, comment, { headers: this.httpHeader});
  }

}
