import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'modal-comment',
    templateUrl: 'modalComment.html',
    styleUrls: ['../reserve.page.scss']
})
export class ModalComment {
  env=environment;
  comment:string;
  score:number;
  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit(){
    
  }

  dismiss() {
    // Usando el injerto del ModalController
    // Usamos "dismiss" para cerrar el modal y devolver los valores
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  submit(){
    //console.log(this.comment);
    this.modalCtrl.dismiss({
      'dismissed': false,
      'comment':this.comment,
      'score':this.score
    });
  }
}

