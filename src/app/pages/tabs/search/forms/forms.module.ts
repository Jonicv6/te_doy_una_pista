import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FormsPageRoutingModule } from './forms-routing.module';
import { FormsPage } from './forms.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsPageRoutingModule,
    RouterModule.forChild([{ path: '', component: FormsPage }])
  ],
  declarations: [FormsPage]
})
export class FormsPageModule { }
