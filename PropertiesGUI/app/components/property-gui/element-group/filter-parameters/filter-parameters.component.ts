import { Component, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import { GroupCollapseComponent } from './group-collapse/group-collapse.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-filter-parameters',
  templateUrl: './filter-parameters.component.html',
  styleUrls: ['./filter-parameters.component.scss']
})

export class FilterParametersComponent implements OnInit {

  @Output() groupCollapseEvent = new EventEmitter();
  @Output() applyFilterEvent = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }
  
  groupCollapse(event) {
    this.groupCollapseEvent.emit(event);
  }

  applyFilter(event) {
    this.applyFilterEvent.emit(event);
  }
}
