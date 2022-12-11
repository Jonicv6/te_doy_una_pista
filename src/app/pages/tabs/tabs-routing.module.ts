import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'search/forms/:id/:sport',
        loadChildren: () => import('./search/forms/forms.module').then(m => m.FormsPageModule)
      },
      {
        path: '/search/forms/comment/:id',
        loadChildren: () => import('./search/forms/comment/comment.module').then(m => m.SportcenterPageModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule)
      },
      {
        path: 'reserve',
        loadChildren: () => import('./reserve/reserve.module').then(m => m.ReservePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/search',
    pathMatch: 'full'
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
