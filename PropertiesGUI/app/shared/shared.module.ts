import { NgModule, isDevMode, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'PropertiesGUI/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatFormFieldModule, MatCheckboxModule, MatExpansionModule, MatInputModule, MatDividerModule, MatToolbarModule, MatTabsModule, MatTreeModule, MatSelectModule, MatAutocompleteModule, MatGridListModule, MatTooltipModule, MatButtonModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const modules = [
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

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
    
  ],
  exports: modules
})
export class SharedModule { }
