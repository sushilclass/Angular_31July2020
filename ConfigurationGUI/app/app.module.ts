import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule } from '@angular/forms';
import {MatTabsModule, MatTableModule, MatIconModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatSelectModule } from '@angular/material';
import {DragDropModule } from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  {MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';
import {ConfigGUIServiceService } from './shared/config-guiservice.service';
import {StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigGUIComponent } from './components/config-gui/config-gui.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const appId = OAuthSettings.appId;
const authorityUrl= OAuthSettings.authorityUrl;
const cacheLocation = "localStorage";

const modules = [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    DragDropModule,
    MatExpansionModule,
    MatCheckboxModule,
    StorageServiceModule,
    NgbModule,
    FontAwesomeModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,

    //https://www.npmjs.com/package/@azure/msal-angular
  MsalModule.forRoot({    
    authority: authorityUrl,
    clientID: appId,
    cacheLocation: cacheLocation, //default was session which we do not want to persist the token.
  })
];

@NgModule({
  declarations: [
    AppComponent,
    ConfigGUIComponent,
    HomeComponent,
    NavBarComponent,
    AlertsComponent,
    ConfirmationDialogComponent
  ],
  imports: [modules],
  entryComponents: [ConfirmationDialogComponent],  
  providers: [ConfigGUIServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
