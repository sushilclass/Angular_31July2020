import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-linked-parent',
  templateUrl: './linked-parent.component.html',
  styleUrls: ['./linked-parent.component.css']
})
export class LinkedParentComponent implements OnInit {
  @Input() linkedParentId;
  @Input() parentLinkIdShow;

  @Output() btnlinkParentIdEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  btnlinkParentId(event, i){
    this.btnlinkParentIdEvent.emit(event);
  }

}
