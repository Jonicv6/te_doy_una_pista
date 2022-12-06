import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SportcenterPage } from './sportcenter.page';
import { SportcenterPageRoutingModule } from './sportcenter-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportcenterPageRoutingModule
  ],
  declarations: [SportcenterPage]
})
export class SportcenterPageModule {}
