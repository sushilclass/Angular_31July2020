import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { LinkedParentComponent } from './linked-parent.component';

@NgModule({
    declarations: [LinkedParentComponent],
    imports: [
      SharedModule
    ],
    exports: [LinkedParentComponent]
  })
  export class LinkedParentModule { }