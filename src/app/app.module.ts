import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './components/films/films.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // see tuto from Fireship : https://www.youtube.com/watch?v=JeeUY6WaXiA
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
