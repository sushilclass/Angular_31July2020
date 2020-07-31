import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementHeaderComponent } from './element-header.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    ElementHeaderComponent,
  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports: [
    ElementHeaderComponent,
  ]
})
export class ElementHeaderModule { }
