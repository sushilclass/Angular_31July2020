import { Component, OnInit, Input, SimpleChange, ChangeDetectorRef } from '@angular/core';
import {ConfigGUIServiceService } from '../../shared/config-guiservice.service';
import {MatTabChangeEvent, MatDialog, MatDialogModule } from '@angular/material';
import { element } from 'protractor';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-config-gui',
  templateUrl: './config-gui.component.html',
  styleUrls: ['./config-gui.component.scss']
})
export class ConfigGUIComponent implements OnInit {
  @Input() userAuthToken: string;
  revitdata: any = [];
  documentsName: any = [];

  createdPhase: any = [];
  createdPhaseValue:any = [];
  createdPhaseCheck:any;
  demolishedsName: any = [];

  existPhase:any = [];
  existPhaseValue:any = [];
  existPhaseCheck:any;

  phaseValueNew:any = [];
  phaseValueExist:any = [];

  machLinked:any = [];
  controlLinked:any = [];

  electricalFixtureLinked:any = [];
  electricalSubscript:any = [];

  chkValue: boolean;
  chkValueModel:boolean;
  chkvalueNewConst:boolean;
  chkvalueExist:boolean;
  ctrldevics:boolean;
  modelNameArray:any = [];
  modelname:any;
  modelguid:any;
  newConstructionDemolished:any = [];
  existDemolishedArray:any = [];
  mechEquipt:any = [];
  controlDevices: any [];
  newConstDemolish:any;
  existDemolished:any;
  revitId:any;
  tabIndex:any = 0;
  mechequpId:any;
  econnectId:any;

  electricalFixtureGUID:any = [];
  controlEquipmentGUID:any = [];
  mechanicalEquipmentGUID:any = [];

  _checkbox:boolean[] = [];
  _tempcheckbox:boolean = false;

  updateUniqueId:any;
  updateUniqueIdList:any = [];

  mechanicalId:any;
  electricalId:any;
  controlId:any;


  constructor(
    private configService: ConfigGUIServiceService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog 
  ) { 
  }

  ngOnInit() {
     this._SyncWithWsRevitElementData();
  }
  
  _SyncWithWsRevitElementData() {
    this.configService.getRevitElements.subscribe(data => {
      this.revitdata = data;
     console.log(JSON.stringify(this.revitdata));

     if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        this.documentsName = element.DocumentsName;  
       
        this.revitId = element.RevitWsSessionId;
      });
     }
           
       
      this.getLinkedMech();
      this.getLinkedControlDevice();
      this._modelFirstLetter();
    },
    error => {
      console.log(error)
    });
  }

  setUpdateData(value, i){
    this.revitId = "";
    this.updateUniqueId = value;
   // console.log(value);
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        this.revitId = element.RevitWsSessionId;
      }); 
    }
   // console.log("Unique Id :" + value);
   // console.log("Revit Session Id :" + this.revitId);
    this.configService._sendData("Recalculate", this.updateUniqueId, this.revitId); 
  }

  allRecalculate(){
   this.revitId = "";
   this.updateUniqueIdList = [];
   if(this.revitdata !== undefined && this.revitdata.length > 0){
     this.revitdata.forEach(element => {
       element.CommonList.forEach(elementdata => {
        if(elementdata.IsUpdate == true){
          this.updateUniqueIdList.push(elementdata.ElectricalConnectionUniqueID);
        }
       });
       this.revitId = element.RevitWsSessionId;
     });
   }
  // console.log("Revit Session Id :" + this.revitId);
  // console.log("Unique Id :" + this.updateUniqueIdList);
   this.configService._sendData("Recalculate", this.updateUniqueIdList, this.revitId); 
  }

  getCommonData(){
    if(this.revitdata.length > 0){
      return this.revitdata[0].CommonList;
    }
  }

  getPhases(){
    if(this.revitdata.length > 0){
      return this.revitdata[0].Phases.CreatedPhase;
    }
  }

  getMechanicalId(event: any, i, value){
   this.mechanicalId = value;
   this.revitId = "";
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        this.revitId = element.RevitWsSessionId;
      }); 
    }
    this.configService._sendData("SendUniqueId", this.mechanicalId, this.revitId);
  }

  getElectricalId(event: any, i, value){
   this.electricalId = value;
   this.revitId = "";
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        this.revitId = element.RevitWsSessionId;
      }); 
    }
   this.configService._sendData("SendUniqueId", this.electricalId, this.revitId);
  }

  getControlEqipId(event: any, i, value){
   this.controlId = value;
   this.revitId = "";
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        this.revitId = element.RevitWsSessionId;
      }); 
    }
   this.configService._sendData("SendUniqueId", this.controlId, this.revitId);
  }

  onCheckBoxChangeMechanical(event: any, i, _value) {
    //  console.log(event);  
    this.mechanicalEquipmentGUID = [];
    let doNotCordinate;
    let _this = this;

    doNotCordinate = this.revitdata[0].CommonList[i];
    if (doNotCordinate.DoNotCoordinate == true) {

    } else {
      //  alert(JSON.stringify(event));
      // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      //   width: '350px',
      //   data: "Do you want to delete this Association?"
      // });
     // dialogRef.afterClosed().subscribe(result => {
       // if (result) {
          // this._tempcheckbox = true;
          this._checkbox[i] = true;
          // alert(this._checkbox[i]);
          //   //  console.log(event.source.value);
          doNotCordinate = this.revitdata[0].CommonList[i];
          doNotCordinate.DoNotCoordinate = event.checked;
          // doNotCordinate.DoNotCoordinate = this._checkbox[i];

          //   //  _this._checkbox[i] = event.checked;  
          let param = _value.split("+");
          this.mechanicalEquipmentGUID.push("Electrical Connection UniqueID :" + param[1]);
          this.mechanicalEquipmentGUID.push("Mechanical Equipment UniqueID :" + param[0]);
          this.configService._sendData("sendMechGUID", this.mechanicalEquipmentGUID, this.revitId);
          // console.log(JSON.stringify(this.mechanicalEquipmentGUID));


        // } else {
        //   doNotCordinate = this.revitdata[0].CommonList[i];
        //   doNotCordinate.DoNotCoordinate = false;  
        //   this.configService._sendData("refreshMechGUID", this.mechanicalEquipmentGUID, this.revitId);     
        // }
     // });
    }
  }

  
  getLinkedMech() {
    if(this.revitdata.length > 0){
   // alert(this.revitdata.length);
    return this.revitdata[0].FamilyInstances.MechanicalEquipments; 
    }   
  }

  

  getLinkedControlDevice(){ 
    if(this.revitdata.length > 0){  
    return this.revitdata[0].FamilyInstances.ControllingDevices; 
    }
  }

  getLinkedElectricalFixture(){
    if(this.revitdata.length > 0){
    return this.revitdata[0].FamilyInstances.ElectricalFixtures;
    }  
  }

  getTagList(index){
    if(this.revitdata.length > 0){
      return this.revitdata[0].TagList;
    }
  }
  setTagcript(index, event){
    console.log(event.source.value);
    // let param
  }

  getElectricalScript(index){
  return  this.revitdata[0].CommonList;  
  }

  setElectricalScript(index, event){  
   let params = event.value.split(" - ");
  let linkedElConnection =  this.revitdata[0].CommonList[index];
  linkedElConnection.Name = params[0] ;
  linkedElConnection.Type = params[1] + "-" + params[2];
  linkedElConnection.Id = params[3];
  this.electricalFixtureGUID.push("Old GUId: " + this.revitdata[0].CommonList[index].ElectricalConnectionUniqueID);
  this.electricalFixtureGUID.push("New GUId: " + params[4]);
 // console.log(this.electricalFixtureGUID);
  this.configService._sendData("sendElectricalGUID", this.electricalFixtureGUID,this.revitId );
  //  this.changeDetectorRef.markForCheck();
  }

  setControlEquipment(index, event){
   let paramsControl = event.value.split(" - ");
  let linkedElConnection =  this.revitdata[0].CommonList[index];
  linkedElConnection.ControllingDeviceName = paramsControl[0];
  linkedElConnection.ControllingDeviceType = paramsControl[1];
  linkedElConnection.ControllingDeviceID = paramsControl[2];
  this.controlEquipmentGUID.push("Controlling Device UniqueID Old: " + this.revitdata[0].CommonList[index].ControllingDeviceUniqueID);
  this.controlEquipmentGUID.push("Controlling Device UniqueID New GUId: " + paramsControl[3]);
  this.controlEquipmentGUID.push("Electrical Connection UniqueID: " + this.revitdata[0].CommonList[index].ElectricalConnectionUniqueID);
  console.log(this.controlEquipmentGUID);
  this.configService._sendData("sendControlGUID", this.controlEquipmentGUID, this.revitId );
  //  this.changeDetectorRef.markForCheck();
  }

  getControllingPanel(index){
    return  this.revitdata[0].CommonList;  
    }

  tabChanged(event:MatTabChangeEvent){
    this.tabIndex = event.index;
  }

  _modelFirstLetter(){
    for(let i=0; i<this.documentsName.length; i++){
     
      let docName = this.documentsName[i].Name;
      let firstLetter = docName.charAt(0);
      if(firstLetter == "M" || firstLetter == "m"){
        this.chkValue = true;
       // console.log(i);
      }
      else{
        this.chkValue = false;
      }
    //  console.log(i, this.chkValue);
    }
  }

  onCheckboxChangeModel(event:any, i){
    let documentName = this.revitdata[0].DocumentsName[i];    
   // if(event.checked){
      documentName.Checked = event.checked;
   // }
  
  }

  onCheckboxChangeDemolished(event:any, phaseIndex, demolishedPhaseIndex){
    let phase = this.revitdata[0].Phases.CreatedPhase[phaseIndex];
    let demolishedPhase = phase.DemolishedPhases[demolishedPhaseIndex];
   
   // if(phase.Checked && event.checked){
    
    demolishedPhase.Checked = event.checked;
  //  }
    
   }
  

   btnSendData(){
   //  let phases = this.revitdata[0].Phases.CreatedPhase;
  // console.log(JSON.parse(this.revitdata[0]));
    this.configService._sendData("sendParameter", this.revitdata[0] ,this.revitId );
   }

}
