import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-linked-detail-element',
  templateUrl: './linked-detail-element.component.html',
  styleUrls: ['./linked-detail-element.component.scss']
})
export class LinkedDetailElementComponent implements OnInit {
  @Input() linkedDetailId;
  @Input() panelTitle;
  
  @Output() btnlinkIdEvent = new EventEmitter(); 
  constructor() { }

  ngOnInit() {
  }

  btnlinkId(value, i) {
    this.btnlinkIdEvent.emit(value);
  }

}
