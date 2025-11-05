import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginModule } from './login/login.module';
import { HCILHttpInterceptor } from './services/Interceptor/http-interceptor';
import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { ConfigurationModule } from './configuration/configuration.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    SharedModule, LoginModule, BrowserAnimationsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatStepperModule,
    MatNativeDateModule,BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    ConfigurationModule,
    LoginModule,
    ReactiveFormsModule ,
    MatDialogModule 
    ],
    
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HCILHttpInterceptor, multi: true },
    DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
