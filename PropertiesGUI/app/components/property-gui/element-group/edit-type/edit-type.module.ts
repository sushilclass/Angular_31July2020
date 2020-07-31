import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTypeComponent } from './edit-type.component';
import { EditTypeDropdownComponent } from './edit-type-dropdown/edit-type-dropdown.component';
import { EditTypeButtonComponent } from './edit-type-button/edit-type-button.component';
import { SharedModule } from '../../../../shared/shared.module';



@NgModule({
  declarations: [EditTypeComponent,EditTypeDropdownComponent,EditTypeButtonComponent],
  imports: [
    CommonModule,SharedModule
  ],
  exports:[EditTypeComponent]
})
export class EditTypeModule { }
