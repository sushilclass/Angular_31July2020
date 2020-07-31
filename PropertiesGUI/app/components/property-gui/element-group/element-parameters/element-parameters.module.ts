import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ElementParametersComponent } from './element-parameters.component';



@NgModule({
  declarations: [ElementParametersComponent],
  imports: [
    SharedModule
  ],
  exports: [ElementParametersComponent]
})
export class ElementParametersModule { }
