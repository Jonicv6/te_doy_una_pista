import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportcenterPage } from './sportcenter.page';


const routes: Routes = [
  {
    path: '',
    component: SportcenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportcenterPageRoutingModule {}