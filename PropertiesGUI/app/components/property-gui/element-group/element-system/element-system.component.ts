import { Component, OnInit, Input, EventEmitter, Output, NgModule } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-element-system',
  templateUrl: './element-system.component.html',
  styleUrls: ['./element-system.component.scss']
})

export class ElementSystemComponent implements OnInit {
  //@Input() _accordianSetting_parameter ;
  @Input() imageData;
  @Input() revitdatalength;
  @Input() currentFamilyNameInstanceSelected;
  @Input() parametersByGroup;
  @Input() myControl = new FormControl();
  @Input() categorySelect = [];
  @Input() familyInstanceSelectedData1: Observable<any[]>;
  @Input() instanceSelectedElements: any[] = [];
  @Input() showInstanceSelected: boolean;
  @Input() panelTitle;
  expansionStates = new Map();
  filter: string="";
  _accordianSetting_parameter = [true, true, true, true, true, true, true];

  displayedColumns: string[] = ['name', 'value', 'abbrev'];
  groupCollapsed = false;

  constructor(private sanitizer: DomSanitizer, ) {

  }

  ngOnInit() {
  }

  @Output() changeFamilyNameInstanceSelectedEvent = new EventEmitter();
  @Output() editTypeEvent = new EventEmitter();
  @Output() setValueEvent = new EventEmitter();
  @Output() resetValueEvent = new EventEmitter();

  getPanelTitle(){
    return this.panelTitle+'('+this.revitdatalength+')';
  }
  imageUrl(imageData) {
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64, " + imageData);
  }

  showImage() {
    return this.imageData != null;
  }

  getParametersByGroup() {
    return this.parametersByGroup;
  }
  changeFamilyNameInstanceSelected(event) {
    this.changeFamilyNameInstanceSelectedEvent.emit(event);
  }
  editType() {
    this.editTypeEvent.emit();
  }
  
  childExpanded(event) {
    let group = event.group;
    if (group != undefined) {
      this.expansionStates.set(group, true);
    }
  }

  childCollapsed(event) {
    let group = event.group;
    if (group != undefined) {
      this.expansionStates.set(group, false);
    }
  }
  setPanelState(event) {
    if (event != undefined && event.group != undefined && event.result != undefined) {
      this.expansionStates.set(event.group, event.result);
    }
  }

  groupCollapse(event) {
    let collapseAll = event;
    this.expansionStates.forEach(function (value, key, map) {
      map.set(key, collapseAll);
    });
  }
  setValue(event) {
    this.setValueEvent.emit(event);
  }
  resetValue(event): any {
    this.resetValueEvent.emit(event);
  }
  applyFilter(event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue.trim().toLowerCase();
    //this.familyInstanceSelectedData1;
    //this.applyFilterEvent.emit(event);
  }
}

