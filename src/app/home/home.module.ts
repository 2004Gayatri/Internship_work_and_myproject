import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { GridLayoutComponent } from '../shared/grid-layout/grid-layout.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UAUCObservationsComponent } from './ua-uc-observations/ua-uc-observations.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { UserManagementComponent } from '../configuration/user-management/user-management.component';
import { ConfirmationPopupComponent } from '../shared/popups/confirmation-popup/confirmation-popup.component';
import { AddRolePopupComponent } from '../shared/popups/add-role-popup/add-role-popup.component';
import { ImportComponent } from './import/import.component';
import { SidebarCollapsComponent } from '../shared/sidebar-collaps/sidebar-collaps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatTabsModule,
    MatRadioModule,
    ReactiveFormsModule ,
  ],
  declarations: [
    HomePage,
    SidebarComponent,
    SidebarCollapsComponent,
    HeaderComponent,
    GridLayoutComponent,
    DashboardComponent,
    UAUCObservationsComponent,
    UserManagementComponent,
    ConfirmationPopupComponent,
    AddRolePopupComponent,
    ImportComponent
  ],

  exports:[
    DashboardComponent,
    UAUCObservationsComponent,
    ImportComponent,
  ]
})
export class HomePageModule {}
