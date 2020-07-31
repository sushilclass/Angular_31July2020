import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { LinkedDetailElementComponent } from './linked-detail-element.component';

@NgModule({
  declarations: [LinkedDetailElementComponent],
  imports: [
    SharedModule
  ],
  exports: [LinkedDetailElementComponent]
})
export class LinkedDetailElementModule { }
