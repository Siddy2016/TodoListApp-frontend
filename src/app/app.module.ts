import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { MenuModule } from './menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './user/login/login.component';
import { UserModule } from './user/user.module'
import { AppService } from './app.service';
//import { HttpService } from './http.service';
import { SocketService } from './socket.service';
import { Socket1Service } from './socket1.service';


@NgModule({
  declarations: [
    AppComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([

      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '*', component: LoginComponent }
    ]),
    UserModule,
    MenuModule,
    HttpClientModule
    
    
    
    
  ],
  providers: [AppService,SocketService,Socket1Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
