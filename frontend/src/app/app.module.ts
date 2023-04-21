import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import {RouterModule} from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps'

import { DatePipe } from '@angular/common'
//import { YelpsearchformComponent } from './components/yelpsearchform/yelpsearchform.component';
import { SearchresService } from './services/searchres.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs'; 
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingsComponent,
   // YelpsearchformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    DatePipe,
    GoogleMapsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    /*
    RouterModule.forRoot([
      {path:'search',component:SearchComponent},
      {path:'bookings',component:BookingsComponent},
      {path: '', redirectTo: '/search', pathMatch: 'full'},
    {path: '**', component: SearchComponent}
    ]),*/
    BrowserAnimationsModule
  ],
  providers: [SearchresService, HttpClient],
  bootstrap: [AppComponent,SearchComponent,BookingsComponent]
})
export class AppModule { }
