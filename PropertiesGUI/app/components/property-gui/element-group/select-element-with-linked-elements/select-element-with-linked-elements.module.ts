import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';


import { SelectElementWithLinkedElementsComponent } from './select-element-with-linked-elements.component';
import { ElementHeaderModule } from '../element-header/element-header.module';
import { EditTypeModule } from '../edit-type/edit-type.module';
import { FilterParametersModule } from '../filter-parameters/filter-parameters.module';
import { ElementParametersModule } from '../element-parameters/element-parameters.module';
import { LinkedDetailElementModule } from '../linked-detail-element/linked-detail-element.module';
import { LinkedParentModule} from '../linked-parent/linked-parent.module';

@NgModule({
  declarations: [
    SelectElementWithLinkedElementsComponent,
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
    SelectElementWithLinkedElementsComponent,
  ],
  bootstrap: [SelectElementWithLinkedElementsComponent]
})
export class SelectElementWithLinkedElementsModule { }
