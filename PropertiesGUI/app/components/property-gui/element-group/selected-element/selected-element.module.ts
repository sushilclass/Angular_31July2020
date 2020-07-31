import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';


import { SelectedElementComponent } from './selected-element.component';
import { ElementHeaderModule } from '../element-header/element-header.module';
import { EditTypeModule } from '../edit-type/edit-type.module';
import { FilterParametersModule } from '../filter-parameters/filter-parameters.module';
import { ElementParametersModule } from '../element-parameters/element-parameters.module';
import { LinkedDetailElementModule } from '../linked-detail-element/linked-detail-element.module';
import {LinkedParentModule } from '../linked-parent/linked-parent.module';

@NgModule({
  declarations: [
    SelectedElementComponent,
  ],
  imports: [
    SharedModule,
    ElementHeaderModule,
    EditTypeModule,
    FilterParametersModule,
    ElementParametersModule,
    LinkedDetailElementModule,
    LinkedParentModule
  ],
  exports: [
    SelectedElementComponent,
  ],
  bootstrap: [SelectedElementComponent]
})
export class SelectedElementModule { }
