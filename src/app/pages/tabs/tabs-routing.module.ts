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
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./search/search.module').then(m => m.SearchPageModule)
          },
          {
            path: 'forms/:id/:sport',
            children: [
              {
                path: '',
                loadChildren: () => import('./search/forms/forms.module').then(m => m.FormsPageModule)
              }
            ]
          },
          {
            path: 'resume',
            children: [
              {
                path: '',
                loadChildren: () => import('./search/resume/resume.module').then(m => m.ResumePageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'maps',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./maps/maps.module').then(m => m.MapsPageModule)
          }
        ]
      },
      {
        path: 'reserve',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./reserve/reserve.module').then(m => m.ReservePageModule)
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./calendar/calendar.module').then(m => m.CalendarPageModule)
          }
        ]
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
