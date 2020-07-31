import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { MsalModule } from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyGUIComponent } from './components/property-gui/property-gui.component';
import { PropertyGuiService } from './shared/propertygui.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { LoginAdComponent } from './components/login-ad/login-ad.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectFilterModule } from 'mat-select-filter';

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

import { OAuthSettings } from '../oauth';
import { AlertsComponent } from './alerts/alerts.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { StorageServiceModule } from 'ngx-webstorage-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectElementWithLinkedElementsModule } from './components/property-gui/element-group/select-element-with-linked-elements/select-element-with-linked-elements.module';
import { SelectedElementModule } from './components/property-gui/element-group/selected-element/selected-element.module';
import { ElementSystemModule } from './components/property-gui/element-group/element-system/element-system.module';


import { SharedModule } from './shared/shared.module';
//import { LinkedParentComponent } from './components/property-gui/element-group/linked-parent/linked-parent.component';

//https://www.npmjs.com/package/@azure/msal-angular

const appId = OAuthSettings.appId;
const authorityUrl= OAuthSettings.authorityUrl;
const cacheLocation = "localStorage";



//import { FormsModule, ReactiveFormsModule } from 'MechanicalCoordinationToolGUI/node_modules/@angular/forms/forms';


export var modules = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
  MatTableModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatInputModule,
  MatDividerModule,
  MatToolbarModule,
  MatTabsModule,
  MatTreeModule,
  MatCardModule,
  MatSelectModule,
  NgbModule,
  FontAwesomeModule,
  StorageServiceModule,
  NgxMatSelectSearchModule,
  FormsModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatTooltipModule,
  MatButtonModule,
  MatSelectFilterModule,
  MsalModule.forRoot({
    authority: authorityUrl,
    clientID: appId,
    cacheLocation: cacheLocation, //default was session which we do not want to persist the token.
  })
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyGUIComponent,
    LoginAdComponent,
    AlertsComponent,
    HomeComponent,
    NavBarComponent,
   // LinkedParentComponent,
  ],
  exports:      [  ],
  imports: [modules,MatSelectFilterModule,SelectedElementModule,SelectElementWithLinkedElementsModule,ElementSystemModule],
  providers: [PropertyGuiService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add FontAwesome icons
    library.addIcons(faExternalLinkAlt);
    library.addIcons(faUserCircle);
  }
}
