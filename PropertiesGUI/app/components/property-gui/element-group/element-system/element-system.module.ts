import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ElementSystemComponent } from './element-system.component';
import { ElementHeaderModule } from '../element-header/element-header.module';
import { EditTypeModule } from '../edit-type/edit-type.module';
import { FilterParametersModule } from '../filter-parameters/filter-parameters.module';
import { ElementParametersModule } from '../element-parameters/element-parameters.module';
import { LinkedDetailElementModule } from '../linked-detail-element/linked-detail-element.module';



@NgModule({
  declarations: [ElementSystemComponent],
  imports: [
    SharedModule,
    ElementHeaderModule,
    EditTypeModule,
    FilterParametersModule,
    ElementParametersModule,
    LinkedDetailElementModule
  ],
  exports: [
    ElementSystemComponent,
  ],
})
export class ElementSystemModule { }
