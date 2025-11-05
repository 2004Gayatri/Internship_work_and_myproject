import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes),IonicModule],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
