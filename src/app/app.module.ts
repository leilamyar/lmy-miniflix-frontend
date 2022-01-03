import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './components/films/films.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { FilmSliderComponent } from './components/film-slider/film-slider.component';
import { MyListComponent } from './pages/my-list/my-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    BrowseComponent,
    FilmCardComponent,
    FilmSliderComponent,
    MyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
