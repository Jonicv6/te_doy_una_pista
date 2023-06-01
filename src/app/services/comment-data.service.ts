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

  httpHeader = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  // Método privado utilizado para asignar un valor al comentario
  private setComment(value: Comment) {
    this._comment = value;
  }

  // Método para obtener los comentarios de una pista específica
  public getComments(track: Track): Observable<any> {
    return this.http.get(environment.endPoint + environment.commentPoint + track.idTrack);
  }

  // Método para crear un comentario
  public createComment(comment: Comment) {
    return this.http.post(environment.endPoint + environment.commentPoint, comment, { headers: this.httpHeader });
  }


}
