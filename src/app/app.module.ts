import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';

import { HttpClientModule } from '@angular/common/http'; 

import { AuthenticationService } from './service/authentication.service';
import { TransactionsService } from './service/transactions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr'; 

@NgModule({
  declarations: [
    AppComponent,
    ListTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
