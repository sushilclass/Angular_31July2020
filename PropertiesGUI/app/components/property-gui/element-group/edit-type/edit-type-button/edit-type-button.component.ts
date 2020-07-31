import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-type-button',
  templateUrl: './edit-type-button.component.html',
  styleUrls: ['./edit-type-button.component.scss']
})
export class EditTypeButtonComponent implements OnInit {

  @Output() editTypeEvent = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
  }

  editType(){
    this.editTypeEvent.emit();
  }

}
