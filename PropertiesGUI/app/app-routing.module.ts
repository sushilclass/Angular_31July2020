import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyGUIComponent } from './components/property-gui/property-gui.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
//  { path: 'calendar', component: CalendarComponent },
 // { path: '', pathMatch: 'full', redirectTo: 'property-gui'},
 // { path: 'property-gui', component: CustomerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
