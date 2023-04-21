import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './components/bookings/bookings.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [

  { path: 'search', component: SearchComponent },
  { path: 'bookings', component: BookingsComponent },
  {path: '', redirectTo: '/search', pathMatch: 'full'},
  { path: '**', component: SearchComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
