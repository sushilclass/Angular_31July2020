import { Component, OnInit, Input, EventEmitter, Output, NgModule } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-element-with-linked-elements',
  templateUrl: './select-element-with-linked-elements.component.html',
  styleUrls: ['./select-element-with-linked-elements.component.scss']
})

export class SelectElementWithLinkedElementsComponent implements OnInit {
  //@Input() _accordianSetting_parameter ;
  @Input() imageData;
  @Input() imageDataLinked;
  @Input() revitdatalength;
  @Input() showInstanceLinked;
  @Input() revitdatacount;
  @Input() currentFamilyNameInstanceSelected; 
  @Input() currentFamilyInstanceSelected;
  @Input() currentFamilyNameInstanceLinked;
  @Input() parametersByGroup;
  @Input() parametersLinkedByGroup;
  @Input() myControl = new FormControl();
  @Input() myControlLink = new FormControl();
  @Input() panelTitle;
  @Input() isClosed = false;
  filter: string="";
  getMyControlLink(){
    return this.myControlLink;
  }
  @Input() categorySelect = [];
  @Input() linkedDetailId = [];
  @Input() familyInstanceSelectedData1: Observable<any[]>;
  @Input() familyInstanceLinkedData1: Observable<any[]>;
  @Input() instanceSelectedElements: any[] = [];
  @Input() showInstanceSelected: boolean;
  @Input() linkedId;
  @Input() phases;
  @Input() currentPhases;
  @Input() currentDataPhase;
  @Input() phaseId;
  @Input() phaseDemolish;
  @Input() currentPhaseDemolish;
  @Input() phaseDemolishId; 
  @Input() revitSId;
  @Input() documentHashCode;
  @Input() elementUniqueId;
  @Input() circuitDiv;
  @Input() linkedParentId;
  @Input() parentLinkIdShow;

  expansionStates = new Map();
  expansionLinkStates = new Map();
  _accordianSetting_parameter = [true, true, true, true, true, true, true];

  displayedColumns: string[] = ['name', 'value', 'abbrev'];
  groupCollapsed = false;

  constructor(private sanitizer: DomSanitizer, ) {
    this.myControlLink;
  }

  ngOnInit() {
  }

  @Output() changeFamilyNameInstanceSelectedEvent = new EventEmitter();
  @Output() changeFamilyInstanceLinkedEvent = new EventEmitter();
  @Output() editTypeEvent = new EventEmitter();
  @Output() setValueEvent = new EventEmitter();
  @Output() resetValueEvent = new EventEmitter();
  @Output() btnlinkIdEvent = new EventEmitter();
  @Output() phaseDemolishChangeEvent = new EventEmitter();
  @Output() phaseChangeEvent = new EventEmitter();
  @Output() btnlinkParentIdEvent = new EventEmitter();
  @Output() setValueListEvent = new EventEmitter();

  //@Output() applyFilterEvent = new EventEmitter();
  
  applyFilter(event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter = filterValue.trim().toLowerCase();
    //this.familyInstanceSelectedData1;
    //this.applyFilterEvent.emit(event);
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

  childLinkExpanded(event) {
    let group = event.group;
    if (group != undefined) {
      this.expansionLinkStates.set(group, true);
    }
  }

  childLinkCollapsed(event) {
    let group = event.group;
    if (group != undefined) {
      this.expansionLinkStates.set(group, false);
    }
  }

  getExpansionPanelClass() {
    let classStr = "tab-bg clps-1"
    if(!this.isClosed){
      classStr+=" cust-scroll"
    }
    return classStr;
  }
  closed(event){
    this.isClosed=true;
  }
  opened(event){
   this.isClosed=false;
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
  changeFamilyInstanceLinked (event) {
    this.changeFamilyInstanceLinkedEvent.emit(event);
  }
  editType() {
    this.editTypeEvent.emit();
  }
  setPanelState(event) {
    if (event != undefined && event.group != undefined && event.result != undefined) {
      this.expansionStates.set(event.group, event.result);
    }
  }

  setLinkPanelState(event) {
    if (event != undefined && event.group != undefined && event.result != undefined) {
      this.expansionLinkStates.set(event.group, event.result);
    }
  }

  groupCollapse(event) {
    let collapseAll = event;
    this.expansionStates.forEach(function (value, key, map) {
      map.set(key, collapseAll);
    });
    this.expansionLinkStates.forEach(function (value, key, map) {
      map.set(key, collapseAll);
    });
  }
  setValue(event) {
    this.setValueEvent.emit(event);
  }
  resetValue(event): any {
    this.resetValueEvent.emit(event);
  }
  btnlinkId(event) {
    if(event != null){
      this.btnlinkIdEvent.emit(event);
    }
  }
  phaseDemolishChange(event) {
    this.phaseDemolishChangeEvent.emit(event);
  }
  phaseChange (event) {
    this.phaseChangeEvent.emit(event);
  } 
  btnlinkParentId(event){
    this.btnlinkParentIdEvent.emit(event);
  }
  setValueList(event) {
    this.setValueListEvent.emit(event);
  } 
}
