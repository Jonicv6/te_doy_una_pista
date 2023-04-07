import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservePage } from './reserve.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatTabsModule} from '@angular/material/tabs';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ModalWeather } from './modals/modalWeather';
import { ModalComment } from './modals/modalComment';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ComponentsModule,
    MatTabsModule,
    ScrollingModule,
    RouterModule.forChild([{ path: '', component: ReservePage }])
  ],
  declarations: [ReservePage, ModalWeather, ModalComment]
})
export class ReservePageModule {}
