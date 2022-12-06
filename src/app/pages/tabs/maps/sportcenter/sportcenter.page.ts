import { Component, OnInit } from '@angular/core';
import { SportCenterDataService } from 'src/app/services/sport-center-data.service';
import { TrackDataService } from 'src/app/services/track-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sportcenter',
  templateUrl: './sportcenter.page.html',
  styleUrls: ['./sportcenter.page.scss'],
})
export class SportcenterPage implements OnInit {

  env = environment;
  comment = {user:"SportExample", text: "texto prueba"};
  newComment = "Escribe un comentario";
  sportcenter = {name:"SportExampleCenter", text: "texto prueba"};
  listComments: any[] = [];
  loading: any;

  constructor(
    private sportCenterDataService: SportCenterDataService,
    private trackDataService: TrackDataService
  ) { }

  ngOnInit() {
  }

  saveComment(){}

}
