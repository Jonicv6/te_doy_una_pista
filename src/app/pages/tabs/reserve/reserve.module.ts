import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservePage } from './reserve.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ComponentsModule,
    MatTabsModule,
    RouterModule.forChild([{ path: '', component: ReservePage }])
  ],
  declarations: [ReservePage]
})
export class ReservePageModule {}
