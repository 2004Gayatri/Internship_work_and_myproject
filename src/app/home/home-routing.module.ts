import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UAUCObservationsComponent } from './ua-uc-observations/ua-uc-observations.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,  
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'ua-uc-observations',
        component: UAUCObservationsComponent,
      },
      {
        path: 'import',  
        component: ImportComponent,
      },
      {
        path: 'configrations',
        loadChildren: () => import('../configuration/configuration.module').then(m => m.ConfigurationModule),
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
