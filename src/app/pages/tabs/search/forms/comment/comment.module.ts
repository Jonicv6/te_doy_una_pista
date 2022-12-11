import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentPage } from './comment.page';
import { CommentPageRoutingModule } from './comment-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentPageRoutingModule
  ],
  declarations: [CommentPage]
})
export class SportcenterPageModule {}
