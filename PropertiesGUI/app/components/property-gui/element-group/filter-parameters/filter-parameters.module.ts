import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FilterParametersComponent } from './filter-parameters.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { GroupCollapseComponent } from './group-collapse/group-collapse.component';



@NgModule({
  declarations: [
    FilterParametersComponent,
    SearchBarComponent,
    GroupCollapseComponent],
  imports: [SharedModule],
  exports: [FilterParametersComponent]
})
export class FilterParametersModule { }
