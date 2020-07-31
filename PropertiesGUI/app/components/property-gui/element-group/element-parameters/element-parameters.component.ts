import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-element-parameters',
  templateUrl: './element-parameters.component.html',
  styleUrls: ['./element-parameters.component.scss']
})
export class ElementParametersComponent implements OnInit {
  @Input() _accordianSetting_parameter;
  @Input() collapseAll;
  @Input() expandAll;
  @Input() panelTitle;
  @Input() customScroll = false;
  @Input() filter = "";
  @Input() expansionStates = new Map();
  filterOld;
  matchesInparametersByGroup = [];
  dataSource;
  isClosed = false;
  parametersByGroupFilter;
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
  @Input() linkedDetailId = [];
  @Input() linkedParentId;
  @Input() parentLinkIdShow;

  displayedColumns: string[] = ['name', 'value', 'abbrev'];
  @Output() setValueEvent = new EventEmitter();
  @Output() resetValueEvent = new EventEmitter();
  @Output() childCollapsedEvent = new EventEmitter();
  @Output() childExpandedEvent = new EventEmitter();
  @Output() setPanelStateEvent = new EventEmitter();
  @Output() phaseChangeEvent = new EventEmitter();
  @Output() phaseDemolishChangeEvent = new EventEmitter();
  @Output() btnlinkIdEvent = new EventEmitter();
  @Output() btnlinkParentIdEvent = new EventEmitter();
  @Output() setValueListEvent = new EventEmitter();

  constructor() {
    this.parametersByGroupFilter = this.parametersByGroup;
    this.filter = 'foo-bar';
  }

  ngOnInit() {
  }
  topCollapsed(event) {
    this.isClosed = true;
  }
  topExpanded(event) {
    this.isClosed = false;

  }
  childExpanded(item) {
    this.childExpandedEvent.emit(item);
  }
  childCollapsed(item) {
    this.childCollapsedEvent.emit(item);
  }

  getExpansionPanelClass() {
    let classStr = "tab-bg clps-1"
    if (this.customScroll && !this.isClosed) {
      classStr += " cust-scroll"
    }
    return classStr;
  }

  parameterComparerValues(otherArray) {
    return function (current) {
      let result1 = otherArray.filter(function (other) {
        return other.Value == current.Value;
      }).length == 1;
      return result1;
    }
  }
  
  setValue(event: any, parameter): any {
    this.setValueEvent.emit({ event: event, parameter: parameter });
  }
  resetValue(event, element): any {
    this.resetValueEvent.emit({ event: event, element: element });
  }

  setPanelState(group, result) {
    this.setPanelStateEvent.emit({ group: group, result: result })
  }

  isPanelExpanded(item) {
    let result = true;
    let group = item.group;
    if (group != undefined) {
      if (this.expansionStates.has(group)) {
        result = this.expansionStates.get(group);
      } else {
        this.setPanelState(group, result);
      }
    }
    return result;
  }
  performFilter(filterBy: string, parametersByGroup): any[] {
    var result;
    filterBy = filterBy.toLocaleLowerCase();

    if (parametersByGroup != undefined) {
      result = parametersByGroup.filter((group: any) => {
        if(group.parameters!=undefined){
          return group.parameters.filter((parameter: any) => {
            let name = parameter.Name;
            if (name != undefined && typeof name == "string") {
              return name.toLocaleLowerCase().indexOf(filterBy) !== -1
            }
          });
        }
      });
    }
    return result;
  }

  get parametersByGroup(): string {
    return this.parametersByGroupFilter;
  }
  @Input() set parametersByGroup(value) {
    this.parametersByGroupFilter = this.filter != undefined ? this.performFilter(this.filter, value) : value;

  }
  phaseChange(event) {
    this.phaseChangeEvent.emit(event);
  }
  phaseDemolishChange(event) {
    this.phaseDemolishChangeEvent.emit(event);
  }
  btnlinkId(event) {
    if(event != null){
      this.btnlinkIdEvent.emit(event);
    }
  }
  btnlinkParentId(event){
    this.btnlinkParentIdEvent.emit(event);
  }
  triggerFunction(event){
    if (event.ctrlKey && event.key === 'Enter'){
      var text = <HTMLInputElement>document.getElementById("textarea1");
          text.value += '\n';
          console.log(text);
    }
    
  }
  setValueList(event) {
    this.setValueListEvent.emit(event);
  } 
}
