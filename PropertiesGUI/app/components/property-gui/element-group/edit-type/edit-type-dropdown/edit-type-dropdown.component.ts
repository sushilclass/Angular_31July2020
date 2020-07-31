import { Component, OnInit, Input, EventEmitter, Output, NgModule } from '@angular/core';

@Component({
  selector: 'app-edit-type-dropdown',
  templateUrl: './edit-type-dropdown.component.html',
  styleUrls: ['./edit-type-dropdown.component.scss']
})
export class EditTypeDropdownComponent implements OnInit {
  
  @Input() revitdatalength;
  @Input() revitdatacount;
  @Input() categorySelect;

  constructor() { }

  ngOnInit() {
  }

}
