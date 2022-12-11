import { Component, OnInit } from '@angular/core';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  env = environment;
  comment = {user:"SportExample", text: "texto prueba"};
  newComment = "Escribe un comentario";
  sportcenter = {name:"SportExampleCenter", text: "texto prueba"};
  listComments: any[] = [];
  loading: any;

  listScore = [1,2,3,4,5,6,7,8,9,10];

  constructor(
    private sportCenterDataService: SportCenterDataService,
    private trackDataService: TrackDataService
  ) { }

  ngOnInit() {
  }

  saveComment(){}

}
