import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConfigGUIComponent } from './components/config-gui/config-gui.component';
import {HomeComponent } from './components/home/home.component';
import {NavBarComponent } from './components/nav-bar/nav-bar.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
