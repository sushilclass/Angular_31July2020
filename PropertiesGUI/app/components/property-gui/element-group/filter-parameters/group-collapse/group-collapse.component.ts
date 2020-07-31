import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-group-collapse',
  templateUrl: './group-collapse.component.html',
  styleUrls: ['./group-collapse.component.scss']
})
export class GroupCollapseComponent implements OnInit {

  expandAll = false;
  title = "Collapse All";
  @Output() groupCollapseEvent = new EventEmitter(); 
  
  constructor() { }

  ngOnInit() {
  }

  groupCollapse(){
    this.groupCollapseEvent.emit(this.expandAll);
    this.expandAll=!this.expandAll;
    if(this.expandAll){
      this.title = "Expand All";
    }else{
      this.title = "Collapse All";
    }
  }
}
