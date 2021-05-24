import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapsPage } from './maps.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: MapsPage }])
  ],
  declarations: [MapsPage],
  providers: [Geolocation]
})
export class MapsPageModule {}
