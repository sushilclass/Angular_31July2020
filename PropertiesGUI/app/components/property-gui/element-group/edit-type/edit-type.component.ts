import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { EditTypeButtonComponent } from './edit-type-button/edit-type-button.component';
import { EditTypeDropdownComponent } from './edit-type-dropdown/edit-type-dropdown.component';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})

export class EditTypeComponent implements OnInit {

  @Input() revitdatanew;
  @Input() revitdatalength;
  @Input() revitdatacount;
  @Input() categorySelect;
  @Output() editTypeEvent = new EventEmitter(); 
  constructor() { }

  getRevitDataLength(){
    if(this.revitdatalength!=undefined){
      return this.revitdatalength;
    }else if(this.revitdatanew!=undefined){
      return this.revitdatanew.length;
    }
  }
  editType(){
    this.editTypeEvent.emit();
  }
  
  ngOnInit() {
  }

}
