import { SimpleChange, Input, Component, OnInit, NgZone, Inject, NgModule, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { PropertyGuiService } from '../../shared/propertygui.service';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT, JsonPipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import * as _ from 'lodash';
import { groupBy, toArray, reduce, map, startWith } from 'rxjs/operators';
import { mergeMap } from 'rxjs-compat/operator/mergeMap';
import { group } from '@angular/animations';
import { from } from 'rxjs/observable/from';
import { of, Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as buffer from 'buffer';
import { MatTabChangeEvent } from '@angular/material';

//--------- AutocompleteSearch Start --------------------------------------------------------
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { element } from 'protractor';
//--------- AutocompleteSearch End --------------------------------------------------------

@Component({
  selector: 'app-property-gui',
  templateUrl: './property-gui.component.html',
  styleUrls: ['./property-gui.component.scss'],

})

@Pipe({
  name: 'stringFilterBy'
})

export class PropertyGUIComponent implements OnInit {
  @ViewChild('singleSelect', { static: false }) singleSelect;
  @ViewChild('matSelect', { static: false }) child: MatSelect;
  @Input() userAuthToken: string;
  elements: any[] = [];
  childSystemParameters: any[] = [];
  instanceSelectedElements: any[] = [];
  instanceLinkedElements: any[] = [];
  typeSelectedElements: any[] = [];
  typeLinkedElements: any[] = [];
  customerList: any = [];
  revitdata: any = [];
  revitdatalength: any;
  revitdatacount: any = [];
  groups: any = [];
  showEdit = false;
  wrapStrLength = 28;
  panelElementOpenState: boolean = true;
  panelGroupState: boolean = false;
  displayedColumns: string[] = ['name', 'value', 'abbrev'];
  commondata: any[] = [];
  Systemcommondata: any[] = [];
  restdata: any[] = [];
  parentElementGUID: any[] = [];
  combostr: any = [];
  isShow: boolean = true;
  colorGUIDORBUILTIN: any = [];
  familyInstance: any = [];
  familyInstanceSelectedData: any = [];
  familyInstanceLinkedData: any = [];
  distarr: any = [];
  distarr1: any = [];
  farray: any = [];
  currentFamily: any;
  currentFamilyName: any;
  copyGroupChildData: any;
  copyGroupChildData1: any;
  currentFamilyInstanceSelected: any;
  currentFamilyInstanceLinked: any;
  currentFamilyTypeSelected: any;
  currentFamilyTypeLinked: any;

  currentFamilyNameInstanceSelected: any;
  currentFamilyNameInstanceLinked: any;
  currentFamilyNameTypeSelected: any;
  currentFamilyNameTypeLinked: any;

  linkedDetailId: any = [];
  linkedId: boolean;
  showAll: boolean;
  divHideShow: boolean = false;
  typeLinkedFlag: boolean;
  circuitDiv:boolean = false;

  categorySelect: any = [];
  categoryLink: any = [];

  public filterFamilyInstanceSelectedData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  public bankGroupsFilterCtrl: string;

  accordianSetting_parameter = {};
  count = {};
  _accordianSetting_parameter = {
    "OP": [true, true, true, true, true, true, true],
    "OTP": [true, true, true, true, true, true, true, true, true],
    "SP": [true, true, true, true, true, true],
    "COP": [true, true, true, true, true, true, true, true, true, true],
    "COTP": [true, true, true, true, true, true, true, true, true]
  };
  expandGroup: boolean[] = [];
  elementGroup: boolean = true;

  familyTypeSelected: any = [];
  familyInsatnceUniqueId: string = "";
  resultFamilyName: string = "";
  resultUniqueId: string = "";
  revitSId: string = "";
  documentHashCode: string = "";
  imageurl: any;
  bytearray: any = [];
  imgarray: any = [];
  imgdata: any = [];
  currentImageData: any = [];

  currentImageDataInstanceSelected: any = [];
  currentImageDataInstanceLinked: any = [];
  currentImageDataTypeSelected: any = [];
  currentImageDataTypeLinked: any = [];

  editDocumentHashCode: string = "";
  editRevitSessionId: string = "";

  linkedIdValue: string = "";
  linkedDocumentHashCode: string = "";
  linkedRevitSessionId: string = "";

  public parashow: boolean = true;
  public paraButtonName: any = 'Parameters Hide';

  public circuitshow: boolean = true;
  public circuitbutton: any = 'Circuit Object Hide';

  public linkedshow: boolean = true;
  public linkedbutton: any = 'Linked details Item Hide';

  public tabIndex: any = 0;

  myControl = new FormControl();
  myControlLink = new FormControl();
  options: any[] = [];
  familyInstanceSelectedData1: Observable<any[]>;
  familyInstanceLinkedData1: Observable<any[]>; 

  phases:any[] = [];
  currentPhases:any[] = [];
  currentDataPhase:any;
  phaseId:any;
  phaseDemolish:any[] = [];
  currentPhaseDemolish:any;
  phaseDemolishId:any;
  elementUniqueId:any;

  workSets:any[] = [];
  currentWorkSet:any;
  selectedElementId:any;
  distributionSystem:any[] = [];
  currentdistributionSystem:any;
  distSystemId:any;
  scheduleLevel:any[] = [];
  currentscheduleLevel:any;
  scheduleId:any;
  wireType:any[] = [];
  currentwiretype:any;
  wireId:any;
  circuitType:any[] = [];
  currentcircuittype:any;
  circuitId:any;
  powerFactor:any[] = [];
  currentpowerfactor:any;
  factorId:any;
  linkedParentId: any = [];
  parentLinkIdShow:boolean = false;

  //--------- AutocompleteSearch Start --------------------------------------------------------
  /** control for the selected option */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();



  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);


  // @ViewChild('singleSelect', {static: false}) singleSelect: ElementRef;
  protected _onDestroy = new Subject<void>();

  //--------- AutocompleteSearch End -----------------------------------------------------------

  public parametersByGroup;
  public parametersLinkedByGroup;
  public parametersSystemsByGroup;
  public parametersTypesByGroup: any[];
  public parametersTypesLinkedByGroup: any[];
  showTypeAll: boolean;
  propertyGuiShow: boolean;
  propertyGuiNeedSelectionShow: boolean;
  propertyWsErrorShow: boolean;
  warningMessage: any;

  constructor(
    public propertyGuiService: PropertyGuiService,
    private ngZone: NgZone,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    //public fName: FName,
    @Inject(DOCUMENT) private _document: Document
  ) {
  }

  async ngOnInit() {
    await this._SyncWithWsRevitElementData();
    
   

    // listen for search field value changes
    // this.bankGroupsFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterBankGroups();
    //   });
  }

  //--------- AutocompleteSearch Start --------------------------------------------------------
  ngAfterViewInit() {
    // console.log(this.child,88);
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  initParameterElements() {
    this.propertyGuiShow = true;
    this.revitdatalength = this.revitdata.length;
    this.elements = this.getElements(this.revitdata);
    this.setShowAll();
    this.setLinkId(this.elements);
    this.getWorkSetElements();
    this.getDistributionSystemElements();
    this.getScheduleLevelElements();
    this.getWireTypeElements();
    this.getPowerFactorElements();
    this.setInstanceSelectedElements();
    this.setInstanceLinkedElements();
    this.setTypeSelectedElements();
    this.setTypeLinkedElements();
    this.setElectricalSystems();
    this.showLinkDetailId();
    this.showFamilyInstanceSelected();
    this.circuitChecked();
    this.showFamilyInstanceLinked();
    this.categorySingleInstanceSelect();
    this.categorySingleInstanceLinked();   
    this.phaseCreate();
    this.currentPhase();
    this.phaseDemolished();
    this.currentPhaseDemolis();
    this.showLinkParentId();
    this.showparentId();
    this.getWorkSets();
    this.getDistributionSystem();
    this.getScheduleLevel();
    this.getWireType();
    this.getPowerFactor();

  }
  // Web Socket method from here

  // load json data using websocket  
  async _SyncWithWsRevitElementData() {
    this.commondata = [];
    this.Systemcommondata = [];
    this.revitdata = [];
    const locationsSubscription = this.propertyGuiService.getRevitElements.subscribe(data => {

      //this.propertyGuiService.getRevitElements().subscribe(data => {
      this.revitdata = data;
      this.parametersByGroup = [];
      this.parametersLinkedByGroup = [];
      this.parametersSystemsByGroup = [];
      this.parametersTypesByGroup = [];
      this.parametersTypesLinkedByGroup = [];

      this.propertyGuiNeedSelectionShow = false;
      this.propertyWsErrorShow = false;
      console.log("Data length : " + this.revitdata.length);
      console.log("revit data :" + JSON.stringify(this.revitdata))  ;
      if (this.revitdata != undefined) {
        if (this.revitdata.length > 1) {
          this.initParameterElements();
          this.combostr = [];

          //   console.log("REvit data length:" + (this.revitdata.length));
          this.revitdata.forEach(element => {
            if (element.ChildDetailItem == null) {
              var catCount = this.revitDataCount(element);
              this.combostr.push(element.Category + " (" + catCount + ")");
            } else {
              var catCount = this.revitDataCount(element.ChildDetailItem);
              this.combostr.push(element.ChildDetailItem.Category + " (" + catCount + ")");
            }



            // if (element.ObjectParameters != undefined) {
            //   element.ObjectParameters.forEach(parameter => {
            //     if (this.verifyParameter(parameter)) {
            //       parameter.RevitWsSessionId = element.RevitWsSessionId;
            //       this.commondata.push(parameter);
            //       this.elementParameters.push(parameter);
            //     }
            //   });
            // }
            // //this.revitdata.forEach(element => {
            // if (element != null && element.ElectricalSystems != null) {
            //   element.ElectricalSystems.forEach(system => {
            //     if (system != null
            //       && system.ObjectParameters != null) {
            //       system.ObjectParameters.forEach(parameter => {
            //         if (this.verifyParameter(parameter)) {
            //           parameter.RevitWsSessionId = element.RevitWsSessionId;
            //           this.Systemcommondata.push(parameter);
            //         }
            //       });
            //     }
            //   });
            // }


            //});

          });
          // var distinctElement = this.combostr.filter(
          //   (thing, i, arr) => arr.findIndex(t => t.element === thing.element) === i
          // );
          this.revitdatacount = [];
          var distinctElement = this.combostr.filter((el, i, a) => i === a.indexOf(el))
          distinctElement.forEach(element => {
            this.revitdatacount.push(element);
          });
          // if(this.revitdatacount.)

          // setTimeout(() =>{
          //   //  console.log(rvdata);
          //   },1000); 

          //this.systemParameters = [];

          // this.elementParameters = [];
          // this.GetGUIDCommonData();
          // this.GetBUILTINCommonData();
          // this.GetBUILTINSystemCommonData();
          // this.GetGUIDSystemCommonData();

        } else if (this.revitdata.length == 1) {
          this.initParameterElements()
          this.commondata = [];
          this.Systemcommondata = [];
          this.familyInstance = [];
          var groupByName = {};
          //this.revitdata = this.revitdata;
          this.revitdatalength = this.revitdata.length;


          this.revitdata.forEach(element => {
            if (element.CurrentType != undefined) {
              this.currentFamily = element.CurrentType.UniqueId;
              this.currentFamilyName = element.CurrentType.FamilyName;
              if (element.CurrentType.Image != undefined) {
                this.currentImageData = element.CurrentType.Image.Data;
              }
            }
            setTimeout(() => {
              //  console.log(rvdata);
            }, 1000);
          });


          let rvdata = this.revitdata.map(data => {
            // if (data.ChildDetailItem == null) {
            //   console.log("Child Null");
            // } else {
            //   console.log("Child Not Null");
            // }
            if(data.ValidTypes != undefined){
              let validTypesData = data.ValidTypes.map(validTypesData => {
                return validTypesData
              });
              //console.log(validTypesData);
              var grouped = _.mapValues(_.groupBy(validTypesData, 'FamilyName'))
  
              //  console.log("Grouped " + JSON.stringify(grouped)); 
              this.familyInstance = [...Object.values(grouped)];
              //  console.log("Parents Instance :" + JSON.stringify(this.familyInstance));
              return validTypesData
            }
           
            
          });

          setTimeout(() => {

          }, 1000);

          this.showFamilyInstanceSelected();
          this.showFamilyInstanceLinked();
          this.categorySingleInstanceSelect();
          this.categorySingleInstanceLinked();


        //  this.getWorkSets();
        //  this.phaseCreate();
        //  this.currentPhase();
        //  this.phaseDemolished();
        //  this.currentPhaseDemolis();

          //   let rvChild = this.revitdata.map(data =>{
          //     let validChildTypesData;
          //     if(data.ChildDetailItem == null){
          //       validChildTypesData = data.ValidTypes.map(validChildTypesData =>{
          //         return validChildTypesData;
          //       });
          //     //  console.log("Child Null");
          //     }else{
          //      // console.log("Child Not Null");
          //      validChildTypesData = data.ChildDetailItem.ValidTypes.map(validChildTypesData =>{
          //       return validChildTypesData;
          //     });
          //     }      

          //   var groupedChild = _.mapValues(_.groupBy(validChildTypesData, 'FamilyName'))

          //   this.familyChildInstance = [...Object.values(groupedChild)];
          // //  console.log("Child Instance :" + JSON.stringify(this.familyChildInstance));
          //   return validChildTypesData
          //   });

          //   setTimeout(() =>{

          //   },1000);

        } else if (this.revitdata.warning != undefined) {
          this.propertyGuiShow = false;
          this.propertyGuiNeedSelectionShow = true;
          this.warningMessage = this.revitdata.warning;
        }
        else {
          this.propertyGuiShow = false;
          this.propertyWsErrorShow = true;
        }
      }
    });
  }

  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
      });
  }


  
  //--------- AutocompleteSearch End  --------------------------------------------------------



  changeFamilyNameInstanceSelected(event) {
    let value = event;
    //console.log(value);
    let selectedName;
    // console.log(JSON.stringify(this.revitdata));
    if (value != undefined) {
      this.revitdata.forEach(element => {
        if (element.ChildDetailItem == null) {
          selectedName = value.UniqueId;
          this.familyInsatnceUniqueId = this.revitdata[0].UniqueId;
          this.documentHashCode = this.revitdata[0].DocumentHashCode;

          this.familyTypeSelected = element.ValidTypes;
          this.resultUniqueId = this.familyTypeSelected.filter(function (obj) { return (obj.UniqueId == selectedName); })[0].UniqueId;
          this.revitSId = element.RevitWsSessionId;
        } else {
          selectedName = value.UniqueId;
          this.familyInsatnceUniqueId = element.ChildDetailItem.UniqueId;
          this.documentHashCode = element.ChildDetailItem.DocumentHashCode;

          this.familyTypeSelected = element.ChildDetailItem.ValidTypes;
          this.resultUniqueId = this.familyTypeSelected.filter(function (obj) { return (obj.UniqueId == selectedName); })[0].UniqueId;
          this.revitSId = element.RevitWsSessionId;
        }
      });
      this.propertyGuiService._CurrentType(this.familyInsatnceUniqueId, this.resultUniqueId, this.revitSId, this.documentHashCode);
    }
   
  }

  changeFamilyInstanceLinked(event) {
    let value = event.source.value;
    let selectedName;
    if (value != undefined) {
      this.revitdata.forEach(element => {
        if (element.ChildDetailItem == null) {
          // selectedName = event.value;
          // this.familyInsatnceUniqueId = this.revitdata[0].UniqueId;
          // this.documentHashCode = this.revitdata[0].DocumentHashCode;

          // this.familyTypeSelected = element.ValidTypes;
          // this.resultUniqueId = this.familyTypeSelected.filter(function (obj) { return (obj.UniqueId == selectedName); })[0].UniqueId;
          // this.revitSId = element.RevitWsSessionId;
        } else {
          selectedName = value.UniqueId;
          this.familyInsatnceUniqueId = element.UniqueId;
          this.documentHashCode = element.DocumentHashCode;

          this.familyTypeSelected = element.ValidTypes;
          this.resultUniqueId = this.familyTypeSelected.filter(function (obj) { return (obj.UniqueId == selectedName); })[0].UniqueId;
          this.revitSId = element.RevitWsSessionId;
        }
      });
      this.propertyGuiService._CurrentType(this.familyInsatnceUniqueId, this.resultUniqueId, this.revitSId, this.documentHashCode);
    }
  }


  imageUrl(imageData) {
    return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64, " + imageData);
  }

  

  editType() {
    this.revitdata.forEach(element => {
      if (element.ChildDetailItem == null) {
        // console.log("Child Null");
        this.editDocumentHashCode = this.revitdata[0].DocumentHashCode; // Parent DocumentHashCode
        this.editRevitSessionId = element.RevitWsSessionId;
      }
      else {
        // console.log("Child Not Null");
        this.editRevitSessionId = element.RevitWsSessionId;
        this.editDocumentHashCode = element.ChildDetailItem.DocumentHashCode; // Child DocumentHashCode
      }
    });
    this.propertyGuiService._EditType(this.editRevitSessionId, this.editDocumentHashCode);
  }

  btnlinkId(event) {
    if (event != null) {
      this.linkedIdValue = event;
      this.linkedDocumentHashCode = this.revitdata[0].DocumentHashCode;
      this.revitdata.forEach(element => {
      this.linkedRevitSessionId = element.RevitWsSessionId;
      });
      this.propertyGuiService._LinkedDetailId(event, this.linkedDocumentHashCode, this.linkedRevitSessionId);
      // alert(value + " " + this.revitdata[0].DocumentHashCode + " " + this.editRevitSessionId);
    }
  }
  btnlinkParentId(event){
    if (event != null) {
      this.revitSId = "";
      this.documentHashCode = "";
      this.elementUniqueId = "";
      this.linkedIdValue = event;
      this.revitdata.forEach(element => {
        this.revitSId = element.RevitWsSessionId;
        this.documentHashCode = element.DocumentHashCode;
        this.elementUniqueId = element.UniqueId;
      });
      this.propertyGuiService._selectedModelId("showElement", event, this.revitSId, this.documentHashCode, this.elementUniqueId);
      // alert(value + " " + this.revitdata[0].DocumentHashCode + " " + this.editRevitSessionId);
    }
  }

  categorySingleInstanceSelect() {
    this.categorySelect = [];
    this.revitdata.forEach(element => {
      if (element.ChildDetailItem == null || element.isCircuit == true) {
        this.categorySelect = element.Category;
      }
      else {
        this.categorySelect = element.ChildDetailItem.Category;
      }
    });

  }

  circuitChecked(){
    if(this.revitdata !== undefined ){
      this.revitdata.forEach(element => {
        // if(element.isCircuit == true || element.isOthers == true){
          if(element.isCircuit == true || element.ValidTypes.length == 0 ){
          this.circuitDiv = true;
        //  console.log("Circuit");
        }
        else{
          this.circuitDiv = false;
        //  console.log("Not Circuit");
        }
      });
    }
  }

  categorySingleInstanceLinked() {
    this.categoryLink = [];
    this.revitdata.forEach(element => {
      if (element.ChildDetailItem == null) {
        this.categoryLink = [];
      }
      else {
        this.categoryLink = element.Category;
      }
    });
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }


  paratoggle() {
    this.parashow = !this.parashow;
    // CHANGE THE PARAMETER NAME OF THE BUTTON.
    if (this.parashow)
      this.paraButtonName = "Parameters Hide";
    else
      this.paraButtonName = "Parameters Show";
  }

  circuitoggle() {
    this.circuitshow = !this.circuitshow;
    // CHANGE THE CIRCUIT NAME OF THE BUTTON.
    if (this.circuitshow)
      this.circuitbutton = "Circuit Object Hide";
    else
      this.circuitbutton = "Circuit Object Show";
  }

  tabChanged(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
    //  console.log(this.tabIndex);
  }

  setParametersbyGroup(parameters) {
    let groups = this.getGroups(parameters);
    let parametersFiltered = [];
    groups.forEach(group => {
      let groupedParameters = this.getParametersByGroup(parameters, group);
      parametersFiltered.push({ group: group, parameters: groupedParameters });
    });
    return parametersFiltered;
  }

  getGroups(parameters) {
    let groups = [];
    let count = 0;
    //this.accordianSetting_parameter[_type] = {};
    // console.log("paramets length:"+parameters.length);
    parameters.forEach((parameter, index) => {
      // console.log("parameter group :"+ parameter.ParameterGroup);
      let group = this.getGroup(parameter);
      //push group if new
      if (groups.indexOf(group) === -1) {
        groups.push(group);

        this.expandGroup.push(false);
        let _group = {};
        _group["name"] = group;
        _group["status"] = false;
        // this.accordianSetting_parameter[_type]["\""+group+"\""]= false;
        //this.accordianSetting_parameter[_type][group] = false;
        // this._accordianSetting_parameter[++count]= false
        //this.accordianSetting_parameter[_type]["name"]=group;
        //this.accordianSetting_parameter[_typue]["status"]=false;
        // console.log("Get Group Index :" + index);
        ++count;
      }
    });
    //this.count[_type] = count;
    // console.log("Index group length :" + count);

    // this.accordianSetting_parameter[_type]=count;
    return groups;
  }

  getExpandIndicator(_type, _group) {
    this.accordianSetting_parameter[_type].forEach(item => {
      if (item.name === _group) {
        return item.status;
      }
    });
  }

  getParametersByGroup(parameters, group) {
    let parametersVisible = []
    parameters.forEach(parameter => {
      let paraGroup = this.getGroup(parameter);
      if (paraGroup == group) {
        parametersVisible.push(parameter);
      }
    });
    return parametersVisible;
  }

  linkedtoggle() {
    this.linkedshow = !this.linkedshow;
    // CHANGE THE Linked details Item NAME OF THE BUTTON.
    if (this.linkedshow)
      this.linkedbutton = "Linked details Item Hide";
    else
      this.linkedbutton = "Linked details Item Show";
  }

  isNumber(parameter) {
    let result = this.isDouble(parameter) || (this.isInteger(parameter) && !this.isCheckbox(parameter));
    result = result && !this.isCheckbox(parameter);
    return result;
  }

  isCheckbox(parameter) {
    if (parameter.ParameterType == "YesNo") {
      return true;
    }
    return false;
  }

  isDropdown(parameter){
    if (parameter.ParameterType == "list") {
      return true;
    }
    return false;
  }

  isDouble(parameter) {
    if (parameter.Type == "double" || parameter.Type == "doubleIntegral") {
      return true;
    }
    return false;
  }

  isInteger(parameter) {
    if (parameter.Type == "int") {
      return true;
    }
    return false;
  }

  isString(parameter) {
    if (parameter.Type == "string") {
      return true;
    }
    return false;
  }

  isStringShort(parameter) {
    if (parameter.Type == "string" && this.getValue(parameter).length < this.wrapStrLength) {
      return true;
    }
    return false;
  }

  isStringMultipleLines(parameter) {
    if (parameter.Type == "string" && parameter.ParameterType == "MultilineText") {
      let str = this.getValue(parameter);
      var match = /\r|\n/.exec(str);
     // if (match) {
        return true;
    //  }
    }
    return false;
  }

  togglePanel(index) {
    // console.log(index);
    // console.log("before:" + this.expandGroup[index]);
    this.expandGroup[index] = true;
    //  console.log("after:" + this.expandGroup[index]);
  }

  elementClose() {
    this.elementGroup = true;
  }
  elementClose1() {
    this.elementGroup = true;
  }
  exp: boolean[];

  groupCollapse() {
    let _type = ["OP", "OTP", "SP"];
    var firstValue = (<HTMLInputElement>document.getElementById("btngroup")).value;

    if (firstValue === "ABC") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = false;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroup")).value = "XYZ";
    } else if (firstValue === "XYZ") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = true;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroup")).value = "ABC";
    }
  }

  groupCollapseInstanceSelected(event) {
    //let _type = ["COP", "COTP"];
    //this.groupCollapse();
    let _type = ["OP"];

    if (event.groupCollapse == true) {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < event.settings[_type[j]].length; i++) {
          event.settings[_type[j]][i] = false;
        }
      }
    } else {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < event.settings[_type[j]].length; i++) {
          event.settings[_type[j]][i] = true;
        }
      }
    }
  }

  groupCollapseInstanceLinked() {
    let _type = ["OTP"];
    var firstValue = (<HTMLInputElement>document.getElementById("btngroupInstanceLinked")).value;

    if (firstValue === "ABC") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = false;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupInstanceLinked")).value = "XYZ";
    } else if (firstValue === "XYZ") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = true;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupInstanceLinked")).value = "ABC";
    }
  }

  groupCollapseInstanceSysyem() {
    let _type = ["SP"];
    var firstValue = (<HTMLInputElement>document.getElementById("btngroupInstanceSystem")).value;

    if (firstValue === "ABC") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = false;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupInstanceSystem")).value = "XYZ";
    } else if (firstValue === "XYZ") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = true;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupInstanceSystem")).value = "ABC";
    }
  }

  groupCollapseTypeLinked() {
    let _type = ["COTP"];
    var firstValue = (<HTMLInputElement>document.getElementById("btngroupTypeLinked")).value;

    if (firstValue === "ABC") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = false;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupTypeLinked")).value = "XYZ";
    } else if (firstValue === "XYZ") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = true;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupTypeLinked")).value = "ABC";
    }
  }

  groupCollapseTypeSelected() {
    let _type = ["COP"];
    var firstValue = (<HTMLInputElement>document.getElementById("btngroupTypeSelected")).value;

    if (firstValue === "ABC") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = false;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupTypeSelected")).value = "XYZ";
    } else if (firstValue === "XYZ") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = true;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupTypeSelected")).value = "ABC";
    }
  }

  groupCollapseTypeAll() {
    let _type = ["COP", "COTP"];
    var firstValue = (<HTMLInputElement>document.getElementById("btngroupTypeAll")).value;

    if (firstValue === "ABC") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = false;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupTypeAll")).value = "XYZ";
    } else if (firstValue === "XYZ") {
      for (let j = 0; j < _type.length; j++) {
        for (let i = 0; i < this._accordianSetting_parameter[_type[j]].length; i++) {
          this._accordianSetting_parameter[_type[j]][i] = true;
        }
      }
      (<HTMLInputElement>document.getElementById("btngroupTypeAll")).value = "ABC";
    }
  }

  showCheckBox(parameter) {
    return this.isCheckbox(parameter);
  }

  showTextArea(parameter) {
    return this.isString(parameter) && (!this.isStringShort(parameter) || this.isStringMultipleLines(parameter));
  }

  showInputArea(parameter) {
    return this.isNumber(parameter) || (this.isStringShort(parameter) && !this.isStringMultipleLines(parameter));
  }

  showDropdown(parameter){
    return this.isDropdown(parameter);
  }

  getAbbrev(parameter) {
    let abbrev = parameter.ValueAbbrev != null ? parameter.ValueAbbrev : "";
    return abbrev;
  }

  getGroup(parameter) {
    let group = parameter.ParameterGroup != null ? parameter.ParameterGroup : "";
    return group;
  }

  getElementInfo() {
    let elemsInfo: { Name, Category } = { Name: "", Category: "" };
    if (this.revitdata != undefined && this.revitdata.length == 1) {     //if t=undefined, call tt
      this.revitdata.forEach(element => {
        if (element != undefined) {
          if (elemsInfo == null) {
            elemsInfo = element;
          } else {
            //For multiple elements should blank values
            elemsInfo.Name = elemsInfo.Name != element.Name ? element.Name : "";
            elemsInfo.Category = elemsInfo.Category != element.Category ? element.Category : "";
          }
          //elems.push(element);
        }
      });
    } else {
      // elemsInfo.Name =  "";
      // elemsInfo.Category =  "";
    }
    return elemsInfo;
  }

  getElements(data) {
    let elements = [];
    if (data != undefined && data.length > 0) {
      data.forEach(element => {
        elements.push(element);
      });
    }
    return elements;
  }

  getParameters(parameters, RevitWsSessionId) {
    let parametersFiltered = [];
    // console.log("Child Not Null");
    //if (element.ObjectParameters != undefined) {
    if (parameters != undefined) {
      parameters.forEach(parameter => {
        if (this.verifyParameter(parameter)) {
          parametersFiltered = this.setElementParameters(parameters, RevitWsSessionId);
        }
      });
    }
    return parametersFiltered;
  }

  setLinkId(elements) {
    this.linkedId = true;
    if (elements != undefined && elements.length > 0) {
      elements.forEach(element => {
        if (element.ChildDetailItem == null) {
          this.linkedId = false;
        }
      });
    }
  }

  parameterComparer(otherArray) {
    return function (current) {
      let result1 = otherArray.filter(function (other) {
        return other.GUID == current.GUID;
      }).length == 1;
      let result2 = otherArray.filter(function (other) {
        return other.BUILTIN == current.BUILTIN;
      }).length == 1;
      return result1 || result2;
    }
  }

  combineElementParameters(parameters, revitWsSessionId, parametersCurrent, elementCount) {
    if (parametersCurrent.length > 0 && elementCount > 0) {
      let parametersNew = this.getParameters(parameters, revitWsSessionId);
      var matchesInCurrent = parametersCurrent.filter(this.parameterComparer(parametersNew));
      var matchesInNew = parametersNew.filter(this.parameterComparer(parametersCurrent));
      //ParentElementUniqueId
      //result = onlyInA.concat(onlyInB);
      matchesInCurrent.forEach(parameterCurrent => {
        matchesInNew.forEach(parameterNew => {
          let hasMatchBuiltIn = parameterCurrent.BUILTIN == parameterNew.BUILTIN && parameterCurrent.BUILTIN != undefined;
          let hasMatchGuid = parameterCurrent.GUID == parameterNew.GUID && parameterCurrent.GUID != undefined;
          if (parameterCurrent.ParentElementUniqueId != undefined && (hasMatchBuiltIn || hasMatchGuid)) {
            if (this.getValue(parameterCurrent) != this.getValue(parameterNew)) {
              parameterCurrent.textValue = "";
            }
            if (typeof parameterCurrent.ParentElementUniqueId == 'string') {
              parameterCurrent.ParentElementUniqueId = [parameterCurrent.ParentElementUniqueId, parameterNew.ParentElementUniqueId];
            } else {
              parameterCurrent.ParentElementUniqueId.push(parameterNew.ParentElementUniqueId);
            }
          }
        });
      });
    } else {
      matchesInCurrent = this.getParameters(parameters, revitWsSessionId);
    }
    return matchesInCurrent;
  }

  // Instance Selected Elements
  setInstanceSelectedElements() {
    this.instanceSelectedElements = [];
    let worddata = this.getWorkSetElements();
    let distsystem = this.getDistributionSystemElements();
    let schlevel = this.getScheduleLevelElements();
    let wirtype =  this.getWireTypeElements(); 
    let pofactor = this.getPowerFactorElements();
    this.elements.forEach(element => {
      if (element.ChildDetailItem == null) {
       element.ObjectParameters.push(worddata);
       element.ObjectParameters.push(distsystem);
       element.ObjectParameters.push(schlevel);
       element.ObjectParameters.push(wirtype);
       element.ObjectParameters.push(pofactor);
       console.log(JSON.stringify(element.ObjectParameters));
        this.instanceSelectedElements = this.combineElementParameters(element.ObjectParameters, element.RevitWsSessionId, [...this.instanceSelectedElements], this.elements.length);
      }
      else {
        this.instanceSelectedElements = this.combineElementParameters(element.ChildDetailItem.ObjectParameters, element.RevitWsSessionId, [...this.instanceSelectedElements], this.elements.length);
      }
    });
    this.parametersByGroup = this.setParametersbyGroup(this.instanceSelectedElements);
  }

  getWorkSets() {
    let currentWorkId = "";
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.Worksets !== undefined && element.Worksets !== null) {
          currentWorkId = element.WorksetId;
          this.currentWorkSet = element.Worksets.phases.filter(function (obj) { return (obj.Id == currentWorkId); })[0].Name;
            this.workSets = element.Worksets.phases;
        }
      });
    //  console.log("Work Set :" + JSON.stringify(this.workSets));
    return this.workSets;
    }
  }
  getCurrentWorkSet() {
    let currentWorkId = "";
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.Worksets !== undefined && element.Worksets !== null) {
          currentWorkId = element.WorksetId;
          this.currentWorkSet = element.Worksets.phases.filter(function (obj) { return (obj.Id == currentWorkId); })[0].Name;
        }
      });
      //  console.log("Work Set :" + JSON.stringify(this.workSets));
      return this.currentWorkSet;
    }
  }
  getWorkSetElements() {
    let work;
    if (this.elements !== undefined && this.elements !== null) {
      this.elements.forEach(element => {
        if (element.Worksets !== null && element.Worksets !== undefined) {
          element.Worksets["Name"] = "Work Sets";
          element.Worksets["Type"] = "list";
          element.Worksets["ValueDropdown"] = this.getWorkSets();
          element.Worksets["Visible"] = true;
          element.Worksets["ParameterType"] = "list";
          element.Worksets["CurrentValueDropdown"] = this.getCurrentWorkSet();
          work = element.Worksets;
        }        
      });
      return work;
    }
  }

  getDistributionSystem() {
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.DistributionSystem !== undefined && element.DistributionSystem !== null) {          
            this.distributionSystem = element.DistributionSystem.phases;
        }
      });
    //  console.log("Distribution System List:" + JSON.stringify(this.distributionSystem));
    return this.distributionSystem;
    }
  } 
  currentDistributionSystem(){
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if(element.CurrentDistributionSystem !== null && element.CurrentDistributionSystem !== undefined){
          element.CurrentDistributionSystem.forEach(elementcurrent => {
            this.currentdistributionSystem = elementcurrent.Name;
          });
        }
      });
    //  console.log("Current Dist Data : " + this.currentdistributionSystem);
    return this.currentdistributionSystem;
    }
  }
  getDistributionSystemElements() {
    let dsystem;
    if (this.elements !== undefined && this.elements !== null) {
      this.elements.forEach(element => {
        if (element.DistributionSystem !== null && element.DistributionSystem !== undefined) {
          element.DistributionSystem["Name"] = "Distribution System";
          element.DistributionSystem["Type"] = "list";
          element.DistributionSystem["ValueDropdown"] = this.getDistributionSystem();
          element.DistributionSystem["Visible"] = true;
          element.DistributionSystem["ParameterType"] = "list";
          element.DistributionSystem["CurrentValueDropdown"] = this.currentDistributionSystem();          
          dsystem = element.DistributionSystem;
        }        
      });
      return dsystem;
    }
  }

  getScheduleLevel() {
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.ScheduleLevel !== undefined && element.ScheduleLevel !== null) {          
            this.scheduleLevel = element.ScheduleLevel.phases;
        }
      });
    //  console.log("schedule Level List:" + JSON.stringify(this.scheduleLevel));
    return this.scheduleLevel;
    }
  }
  currentScheduleLevel(){
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if(element.CurrentScheduleLevel !== null && element.CurrentScheduleLevel !== undefined){
          element.CurrentScheduleLevel.forEach(elementcurrent => {
            this.currentscheduleLevel = elementcurrent.Name;
          });
        }
      });
    //  console.log("Current Dist Data : " + this.currentdistributionSystem);
    return this.currentscheduleLevel;
    }
  }
  getScheduleLevelElements() {
    let slevel;
    if (this.elements !== undefined && this.elements !== null) {
      this.elements.forEach(element => {
        if (element.ScheduleLevel !== null && element.ScheduleLevel !== undefined) {
          element.ScheduleLevel["Name"] = "Schedule Level";
          element.ScheduleLevel["Type"] = "list";
          element.ScheduleLevel["ValueDropdown"] = this.getScheduleLevel();
          element.ScheduleLevel["Visible"] = true;
          element.ScheduleLevel["ParameterType"] = "list";
          element.ScheduleLevel["CurrentValueDropdown"] = this.currentScheduleLevel();
          slevel = element.ScheduleLevel;
        }        
      });
      return slevel;
    }
  }

  getWireType() {
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.WireType !== undefined && element.WireType !== null) {          
            this.wireType = element.WireType.phases;
        }
      });
    //  console.log("wireType List:" + JSON.stringify(this.wireType));
    return this.wireType;
    }
  }
  currentWireType(){
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if(element.CurrentWireType !== null && element.CurrentWireType !== undefined){
          element.CurrentWireType.forEach(elementcurrent => {
            this.currentwiretype = elementcurrent.Name;
          });
        }
      });
    //  console.log("current wiretype Data : " + this.currentwiretype);
    return this.currentwiretype;
    }
  }
  getWireTypeElements() {
    let wtype;
    if (this.elements !== undefined && this.elements !== null) {
      this.elements.forEach(element => {
        if (element.WireType !== null && element.WireType !== undefined) {
          element.WireType["Name"] = "Wire Type";
          element.WireType["Type"] = "list";
          element.WireType["ValueDropdown"] = this.getWireType();
          element.WireType["Visible"] = true;
          element.WireType["ParameterType"] = "list";
          element.WireType["CurrentValueDropdown"] = this.currentWireType();
          wtype = element.WireType;
        }        
      });
      return wtype;
    }
  }

  getPowerFactor() {
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.PowerFactor !== undefined && element.PowerFactor !== null) {          
            this.powerFactor = element.PowerFactor.phases;
        }
      });
    //  console.log(Power Factor List:" + JSON.stringify(this.powerFactor));
    return this.powerFactor;
    }
  }
  currentPowerFactor(){
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if(element.CurrentPowerFactor !== null && element.CurrentPowerFactor !== undefined){
          element.CurrentPowerFactor.forEach(elementcurrent => {
            this.currentpowerfactor = elementcurrent.Name;
          });
        }
      });
    //  console.log("current power factor Data : " + this.currentpowerfactor);
    return this.currentpowerfactor;
    }
  }
  getPowerFactorElements() {
    let pfactor;
    if (this.elements !== undefined && this.elements !== null) {
      this.elements.forEach(element => {
        if (element.PowerFactor !== null && element.PowerFactor !== undefined) {
          element.PowerFactor["Name"] = "Power Factor";
          element.PowerFactor["Type"] = "list";
          element.PowerFactor["ValueDropdown"] = this.getPowerFactor();
          element.PowerFactor["Visible"] = true;
          element.PowerFactor["ParameterType"] = "list";
          element.PowerFactor["CurrentValueDropdown"] = this.currentPowerFactor();
          pfactor = element.PowerFactor;
        }        
      });
      return pfactor;
    }
  }

  //element.ElectricalSystems
  setElectricalSystems() {
    let systemParameters = [];
    this.elements.forEach(element => {
      if (element.ElectricalSystems != null && element.ElectricalSystems.length == 1) {
        systemParameters = this.combineElementParameters(element.ElectricalSystems[0].ObjectParameters, element.RevitWsSessionId, [...systemParameters], this.elements.length);
      }
    });
    this.parametersSystemsByGroup = this.setParametersbyGroup(systemParameters);
  }


  // Instance Linked Elements
  setInstanceLinkedElements() {
    this.instanceLinkedElements = [];
    this.elements.forEach(element => {
      if (element.ChildDetailItem == null) {
        this.instanceLinkedElements = [];
      }
      else {
        this.instanceLinkedElements = this.combineElementParameters(element.ObjectParameters, element.RevitWsSessionId, [...this.instanceLinkedElements], this.elements.length);
      }
    });
    this.parametersLinkedByGroup = this.setParametersbyGroup(this.instanceLinkedElements);
  }

  // Type Selected Elements
  setTypeSelectedElements() {
    this.typeSelectedElements = [];
    this.elements.forEach(element => {
      if (element.ChildDetailItem == null) {
        this.typeSelectedElements = this.combineElementParameters(element.ObjectTypeParameters, element.RevitWsSessionId, [...this.typeSelectedElements], this.elements.length);
      }
      else {
        this.typeSelectedElements = this.combineElementParameters(element.ChildDetailItem.ObjectTypeParameters, element.RevitWsSessionId, [...this.typeSelectedElements], this.elements.length);
      }
    });
    this.parametersTypesByGroup = this.setParametersbyGroup(this.typeSelectedElements);
  }

  // Type Linked Elements
  setTypeLinkedElements() {
    this.typeLinkedElements = [];
    this.typeLinkedFlag = true;
    this.elements.forEach(element => {
      if (element.ChildDetailItem == null) {
        this.typeLinkedFlag = false;
      }
      else {
        this.typeLinkedElements = this.combineElementParameters(element.ObjectTypeParameters, element.RevitWsSessionId, [...this.typeLinkedElements], this.elements.length);
      }
    });
    if (!this.typeLinkedFlag) {
      this.typeLinkedElements = [];
    }
    this.parametersTypesLinkedByGroup = this.setParametersbyGroup(this.typeLinkedElements);
  }

  setElementParameters(parameters, revitWsSessionId) {
    let elements = [];
    parameters.forEach(parameter => {
      if (this.verifyParameter(parameter)) {
        parameter.RevitWsSessionId = revitWsSessionId;
        parameter.isModifiable = this.isModifiable(parameter);
        parameter.inputType = this.getInputType(parameter);
        parameter.showCheckBox = this.showCheckBox(parameter);
        parameter.showDropdown = this.showDropdown(parameter);
        parameter.abbrev = this.getAbbrev(parameter);
        if (parameter.showCheckBox) {
          parameter.isChecked = this.getValue(parameter, true);
        }
        parameter.showInputArea = this.showInputArea(parameter);
        parameter.showTextArea = this.showTextArea(parameter);
        if (parameter.showTextArea || parameter.showInputArea || parameter.showDropdown) {
          parameter.textValue = this.getValue(parameter);
          parameter.textCurrentValue = this.getCurrentValue(parameter);
        }
        elements.push(parameter);
      }
    });
    return elements;
  }
  showFamilyInstanceSelected() {
    let rvChild = this.revitdata.map(data => {
      if(data.ChildDetailItem !== undefined){
      let validChildTypesData;      
        if (data.ChildDetailItem == null) {
          this.currentFamilyNameInstanceSelected = data.CurrentType.FamilyName;
          this.currentFamilyInstanceSelected = data.CurrentType;
          if (data.CurrentType.Image != undefined) {
            this.currentImageDataInstanceSelected = data.CurrentType.Image.Data;
          } else {
            this.currentImageDataInstanceSelected = null;
          }
  
          validChildTypesData = data.ValidTypes.map(validChildTypesData => {
            return validChildTypesData;            
          });
          
          //  console.log("Child Null");
        } else {
          //  console.log("Child Not Null");
          this.currentFamilyNameInstanceSelected = data.ChildDetailItem.CurrentType.FamilyName;
          this.currentFamilyInstanceSelected = data.ChildDetailItem.CurrentType;
  
          if (data.ChildDetailItem.CurrentType.Image != undefined) {
            this.currentImageDataInstanceSelected = data.ChildDetailItem.CurrentType.Image.Data;
          } else {
            this.currentImageDataInstanceSelected = null;
          }
          validChildTypesData = data.ChildDetailItem.ValidTypes.map(validChildTypesData => {
            return validChildTypesData;
          });
        }
     // }
        let matchArray = [];
        let matchNotArray = [];
        let parentArray = validChildTypesData;
        parentArray.forEach(element => {
          parentArray = element;
          if(element.FamilyName == this.currentFamilyNameInstanceSelected){
              matchArray.push(element); 
          }
          if(element.FamilyName !== this.currentFamilyNameInstanceSelected){
            matchNotArray.push(element); 
        }           
        });
        let condata = matchArray.concat(matchNotArray);
        
      validChildTypesData = condata;
      this.copyGroupChildData = validChildTypesData;

      var groupedChild = _.mapValues(_.groupBy(validChildTypesData, 'FamilyName'))

      this.familyInstanceSelectedData = [...Object.values(groupedChild)];
     // this.matchInstanceFamilyName = this.currentFamilyNameInstanceSelected;
    //  this.matchInstanceName = this.currentFamilyInstanceSelected.Name;
      //console.log(this.currentFamilyInstanceSelected);
      this.myControl.setValue(this.currentFamilyInstanceSelected.Name);
      this.familyInstanceSelectedData1 = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => {
            return this._filterGroup(value)
          })
        );
      //  console.log("Child Instance :" + JSON.stringify(this.familyInstanceSelectedData));
      return validChildTypesData
        }
    });

    setTimeout(() => {

    }, 1000);
  }

  showFamilyInstanceLinked() {
    // console.log("REvit data :" + JSON.stringify(this.revitdata));
    let rvChild = this.revitdata.map(data => {
      if(data.ChildDetailItem !== undefined){
        let validChildTypesData;
      if (data.ChildDetailItem == null) {
        this.currentFamilyNameInstanceLinked = [];
        this.currentFamilyInstanceLinked = [];
        this.currentImageDataInstanceLinked = [];
        validChildTypesData = data.ValidTypes.map(validChildTypesData => {
          validChildTypesData = "";
          return validChildTypesData;
        });
        //  console.log("Child Null");
      } else {
        //  console.log("Child Not Null");
        this.currentFamilyNameInstanceLinked = data.CurrentType.FamilyName;
        this.currentFamilyInstanceLinked = data.CurrentType.UniqueId;

        if (data.CurrentType.Image != undefined) {
          this.currentImageDataInstanceLinked = data.CurrentType.Image.Data;
        } else {
          this.currentImageDataInstanceLinked = null;
        }
        validChildTypesData = data.ValidTypes.map(validChildTypesData => {
          return validChildTypesData;
        });
      }

      let matchArray = [];
        let matchNotArray = [];
        let parentArray = validChildTypesData;
        parentArray.forEach(element => {
          parentArray = element;
          if(element.FamilyName == this.currentFamilyNameInstanceLinked){
              matchArray.push(element); 
          }
          if(element.FamilyName !== this.currentFamilyNameInstanceLinked){
            matchNotArray.push(element); 
        }           
        });
        let condata = matchArray.concat(matchNotArray);
        validChildTypesData = condata;
        
      this.copyGroupChildData1 = validChildTypesData;
      var groupedChild = _.mapValues(_.groupBy(validChildTypesData, 'FamilyName'))
     // this.matchLinkedName = data.CurrentType.Name;
     // this.matchLinkedFamilyName = this.currentFamilyNameInstanceLinked;
      this.myControlLink.setValue(data.CurrentType.Name)
      this.familyInstanceLinkedData = [...Object.values(groupedChild)];
      this.familyInstanceLinkedData1 = this.myControlLink.valueChanges
        .pipe(
          startWith(''),
          map(value => {
            return this._filterGroupLink(value)
          })
        );
      return validChildTypesData  
      }
      
    });

    setTimeout(() => {

    }, 1000);
  }

  showLinkDetailId() {
    this.linkedDetailId = [];
    if (this.revitdata[0].isCircuit == true) {

    } else {
      if (this.revitdata != undefined && this.revitdata.length > 0) {
        this.revitdata.forEach(element => {
          // console.log("Linked details id :" + element.LinkedDetailID.length);
          if (element.LinkedDetailID != null) {
            element.LinkedDetailID.forEach(parameter => {
              // if(this.verifyParameter(parameter)){
              //   parameter.RevitWsSessionId = element.RevitWsSessionId;
              this.linkedDetailId.push(parameter);
              //  }
            });
          }
        });
      } else {
        this.linkedDetailId = [];
      }
    }
  }
  showLinkParentId(){
    this.linkedParentId = [];
    if (this.revitdata[0].isCircuit == true) {

    } else {
      if (this.revitdata != undefined && this.revitdata.length > 0) {
        this.revitdata.forEach(element => {
              this.linkedParentId.push(element);
        });
      } else {
        this.linkedParentId = [];
      }
    }
   // console.log("Parent Data :" + JSON.stringify(this.linkedParentId));
  }
  showparentId(){
    this.parentLinkIdShow = false;
    if (this.revitdata != undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if(element.ChildDetailItem !== null){
          this.parentLinkIdShow = true;
        }
      });
    }
   // console.log(this.parentLinkIdShow);
  }
  phaseCreate() {    
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if (element.PhaseCreated !== null) {
          this.phases = element.PhaseCreated;
        }
      });
    }   
  }
  currentPhase(){
    this.currentDataPhase = "";
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if (element.CurrentPhaseCreated !== null && element.CurrentPhaseCreated !== undefined) {
          this.currentPhases = element.CurrentPhaseCreated[0].Name;
        }
      });
    } 
  }
  phaseChange(event) {
    this.revitSId = "";
    this.documentHashCode = "";
    this.elementUniqueId = "";
    let selectedName = event.target.value;
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.PhaseCreated !== null) {
          let currentPhase = element.PhaseCreated;
           this.phaseId = currentPhase.filter(function (obj) { return (obj.Name == selectedName); })[0].Id;
          this.revitSId = element.RevitWsSessionId;
          this.documentHashCode = element.DocumentHashCode;
          this.elementUniqueId = element.UniqueId;
          this.propertyGuiService._selectedPhaseId(this.phaseId, this.revitSId, this.documentHashCode, this.elementUniqueId); 
        }
      });
    }
  }
  phaseDemolished(){
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if (element.PhaseDemolished !== null) {
          this.phaseDemolish = element.PhaseDemolished;
        }
      });
    }  
  }
  currentPhaseDemolis(){
    if(this.revitdata !== undefined && this.revitdata.length > 0){
      this.revitdata.forEach(element => {
        if (element.CurrentPhaseDemolished !== null && element.CurrentPhaseDemolished !== undefined) {
          this.currentPhaseDemolish = element.CurrentPhaseDemolished[0].Name;
         //  this.currentPhaseDemolish = element.CurrentPhaseDemolished;
        }
      });
    }  
  }
  phaseDemolishChange(event){
    this.revitSId = "";
    this.documentHashCode = "";
    this.elementUniqueId = "";
    let selectedName = event.target.value;
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.PhaseDemolished !== null) {
          let currentPhaseDemolish = element.PhaseDemolished;
           this.phaseDemolishId = currentPhaseDemolish.filter(function (obj) { return (obj.Name == selectedName); })[0].Id;
          this.revitSId = element.RevitWsSessionId;
          this.documentHashCode = element.DocumentHashCode;
          this.elementUniqueId = element.UniqueId;
          this.propertyGuiService._selectedPhaseDemolishId(this.phaseDemolishId, this.revitSId, this.documentHashCode, this.elementUniqueId);
         
        }
      });
    }
  }


  //Needs to handle multiple elements

  setShowAll() {
    // let result = false;
    this.showAll = true;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null) {
          if (element.isCircuit == true || element.isOthers == true
            || (element.ElectricalSystems.length < 1 && element.ChildDetailItem == null)) {
            if (element.ObjectParameters.length > 1) {
              this.showAll = false;
            }
          }
          if (element.ChildDetailItem == null) {
            this.showTypeAll = false;
          } else {
            this.showTypeAll = true;
          }
        }
      });
    } else if (this.revitdata.length == undefined) {
      this.showAll = false;
    }
    return this.showAll;
  }

  showElectricalSystem() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ElectricalSystems != null) {
          result = element.ElectricalSystems.length > 0 ? true : false;
        }
      });
    } else if (this.revitdata.length == undefined) {
      result = true;
    }
    return result;
  }

  showInstanceSelected() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ObjectParameters != null) {
          result = element.ObjectParameters.length > 0 ? true : false;
        }
      });
    } else if (this.revitdata.length == undefined) {
      result = true;
    }
    return result;
  }


  showInstanceLinked() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ChildDetailItem != null && element.ObjectParameters != null) {
          result = element.ObjectParameters.length > 0 ? true : false;
        }
      });
    } else if (this.revitdata.length == undefined) {
      result = true;
    }
    return result;
  }

  showLinkedDetailId() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.LinkedDetailID != null) {
          result = element.LinkedDetailID.length > 0 ? true : false;
        }
      });
    } else if (this.revitdata.length == undefined) {
      result = true;
    }
    return result;
  }

  showTypeSelected() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ObjectTypeParameters != null) {
          result = element.ObjectTypeParameters.length > 0 ? true : false;
        }
      });
    } else if (this.revitdata.length == undefined) {
      result = true;
    }
    return result;
  }

  showTypeLinked() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ChildDetailItem != null && element.ObjectTypeParameters != null) {
          result = element.ObjectTypeParameters.length > 0 ? true : false;
        }
      });
    } else if (this.revitdata.length == undefined) {
      result = true;
    }
    return result;
  }
  //Needs to handle multiple elements
  showObjectType() {
    let result = false;
    if (this.revitdata != null && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element != null && element.ObjectTypeParameters != null) {
          result = element.ObjectTypeParameters.length > 0 ? true : false;
        }
      });
    } else if (this.revitdata.length == undefined) {
      result = true;
    }
    return result;
  }

  verifyParameter(parameter) {
    return parameter != undefined && this.hasValue(parameter)
      && parameter.Visible
  }

  isModifiable(parameter) {
    // let result = parameter != undefined && !parameter.IsReadOnly
    //   && (parameter.UserModifiable || parameter.BUILTIN != null) && parameter.Visible
    // return result;
    let result = parameter !== undefined && !parameter.IsReadOnly
    && parameter.Visible
    return result;
  }

  getValue(parameter, isCheckbox = false): any {
    var value;
    if (parameter != null && parameter.multipleValues != true) {
      switch (parameter.Type) {
        case "double":
          if(parameter.ParameterType == "Length"){
            value = parameter.ValueString == null ? "" : parameter.ValueString;
          }else{
            value = parameter.ValueDouble;
          }          
          break;
        case "doubleIntegral":
          value = parameter.ValueDoubleIntegral;
          break;
        case "int":
          value = parameter.ValueInteger;
          if (isCheckbox) {
            value = value == 1 ? true : false;
          }
          break;
        case "string":
          value = parameter.ValueString == null ? "" : parameter.ValueString;
          break;
        case "list":
          value = parameter.ValueDropdown == null ? "" : parameter.ValueDropdown;
          break;
        // case "invalid":
        //   value = parameter.ValueString == null ? "" : parameter.ValueString;
        //   break; 
      }
    }
    return value;

  }

  getCurrentValue(parameter, isCheckbox = false): any {
    var value;
    if (parameter != null && parameter.multipleValues != true) {
      switch (parameter.Type) {
        case "double":
          if(parameter.ParameterType == "Length"){
            value = parameter.ValueString == null ? "" : parameter.ValueString;
          }else{
            value = parameter.ValueDouble;
          }          
          break;
        case "doubleIntegral":
          value = parameter.ValueDoubleIntegral;
          break;
        case "int":
          value = parameter.ValueInteger;
          if (isCheckbox) {
            value = value == 1 ? true : false;
          }
          break;
        case "string":
          value = parameter.ValueString == null ? "" : parameter.ValueString;
          break;
        case "list":
          value = parameter.CurrentValueDropdown == null ? "" : parameter.CurrentValueDropdown;
          break;
        // case "invalid":
        //   value = parameter.ValueString == null ? "" : parameter.ValueString;
        //   break; 
      }
    }
    return value;

  }

  hasValue(parameter): any {
    var value = false;
    if (parameter != null) {
      switch (parameter.Type) {
        case "double":
          value = true;
          break;
        case "doubleIntegral":
          value = true;
          break;
        case "int":
          value = true;
          break;
        case "string":
          value = true;
          break;
        case "list":
          value = true;
          break;
        // case "invalid":
        //   value = true;
        //   break;  
      }
    }
    return value;
  }

  getInputType(parameter): any {
    var value;
    if (parameter != null) {
      switch (parameter.Type) {
        case "double":
          if(parameter.ParameterType == "Length"){
            value = "text";            
          }else{
            value = "number";
          }          
          break;
        case "doubleIntegral":
          value = "number";
          break;
        case "int":
          value = "number";
          break;
        case "string":
          value = "text";
          break;
        case "list":
            value = "text";
            break;    
      }
    }
    return value;
  }


  setValue(eventObj): any {
    let event = eventObj.event;
    let parameter = eventObj.parameter;
    var value;
    var parameterName;
    switch (parameter.Type) {
      case "double":
        if(parameter.ParameterType == "Length"){
         value = event.target.value == null ? "" : event.target.value; 
        }else{
          value = event.target.valueAsNumber;
        }        
        break;
      case "doubleIntegral":
        value = event.target.valueAsNumber;
        break;
      case "int":
        if (event.target != null) {
          value = event.target.valueAsNumber;
        }
        if (event.checked != null) {
          value = event.checked ? 1 : 0;
        }
        break;
      case "string":
        value = event.target.value == null ? "" : event.target.value;
        break;
      // case "list":
      //   value = event.target.value == null ? "" : event.target.value;
      //   this.setValueList(value);
      //   break;
      // case "invalid":
      //   value = event.target.ValueString == null ? "" : event.target.ValueString;
      //   break;
    }
    if(parameter.GUID == null && parameter.BUILTIN == null){
      parameterName = parameter.Name;
    } else{
      parameterName = null;
    }
    this.propertyGuiService
      ._UpdateRevitParameter(parameter.ParentElementUniqueId, value, parameterName, parameter.GUID, parameter.BUILTIN, parameter.DocumentHashCode, parameter.RevitWsSessionId)
  }

  setValueList(event, parameter):any{
    this.revitSId = "";
    this.documentHashCode = "";
    this.elementUniqueId = "";
    this.selectedElementId = "";
    let elementsArray = [];
    let selectElementBuiltIn = "";
    let selectedName = event.target.value;
    if (this.revitdata !== undefined && this.revitdata.length > 0) {
      this.revitdata.forEach(element => {
        if (element.Worksets !== null && element.Worksets !== undefined &&
          element.DistributionSystem !== null && element.DistributionSystem !== undefined &&
          element.ScheduleLevel !== null && element.ScheduleLevel !== undefined &&
          element.WireType !== null && element.WireType !== undefined &&
          element.PowerFactor !== null && element.PowerFactor !== undefined) {
          elementsArray = [...elementsArray, ...element.Worksets.phases, ...element.DistributionSystem.phases, ...element.ScheduleLevel.phases, ...element.WireType.phases,
          ...element.PowerFactor.phases];
         //  console.log(JSON.stringify(elementsArray));

          this.selectedElementId = elementsArray.filter(function (obj) { return (obj.Name == selectedName); })[0].Id;
          selectElementBuiltIn = elementsArray.filter(function (obj) { return (obj.Name == selectedName); })[0].BuiltIn;

          this.revitSId = element.RevitWsSessionId;
          this.documentHashCode = element.DocumentHashCode;
          this.elementUniqueId = element.UniqueId;
          this.propertyGuiService._selectedDropdownElementId("SendSelectionValue", this.selectedElementId, selectElementBuiltIn, this.revitSId, this.documentHashCode, this.elementUniqueId);
        }
      });
    }
  }

  // getMultipleElementForGUID(element) {
  //   this.parentElementGUID = [];
  //   this.commondata.forEach(ele => {
  //     if (element.GUID === ele.GUID) {
  //       this.parentElementGUID.push(ele);
  //     }
  //   });
  // }

  // getMultipleElementForBUILTIN(element) {
  //   this.parentElementGUID = [];
  //   this.commondata.forEach(ele => {
  //     if (element.BUILTIN === ele.BUILTIN) {
  //       this.parentElementGUID.push(ele);
  //     }
  //   });
  // }

  // getMultipleElementForSystemGUID(element) {
  //   this.parentElementGUID = [];
  //   this.Systemcommondata.forEach(ele => {
  //     if (element.GUID === ele.GUID) {
  //       this.parentElementGUID.push(ele);
  //     }
  //   });
  // }

  // getMultipleElementForSystemBUILTIN(element) {
  //   this.parentElementGUID = [];
  //   this.Systemcommondata.forEach(ele => {
  //     if (element.BUILTIN === ele.BUILTIN) {
  //       this.parentElementGUID.push(ele);
  //     }
  //   });
  // }

  setValueForCommonData(element, value): any {
    switch (element.Type) {
      case "double":
        element.ValueDouble = value;
        break;
      case "doubleIntegral":
        element.ValueDoubleIntegral = value;
        break;
      case "int":
        if (event.target != null) {
          element.valueAsNumber = value;
        }
        // if (event.checked != null) {
        //   value = event.checked ? 1 : 0;
        // }
        break;
      case "string":
        element.ValueString = value == null ? "" : value;
        break;
    }

  }

  resetValue(eventObj): any {
    let event = eventObj.event;
    let element = eventObj.element;

    event.target.value = this.getValue(element);
  }



  // GetCurrentType(revitdata){
  //   var retdata = revitdata.forEach(element => {
  //    retdata = element.element.CurrentType.UniqueId; 
  //    console.log("Data :" + retdata)
  //   });
  //   return retdata;    
  // }

  // GetGUIDCommonData() {
  //   let count = 0;
  //   let value = '';
  //   this.commondata.forEach(element => {
  //     count = 0;
  //     value = '';
  //     if (element.GUID != null) {
  //       this.commondata.forEach(element1 => {
  //         if (element1.GUID === element.GUID) {
  //           count++;
  //           var value1 = this.getValue(element1, false);
  //           if (value === value1 && count > 1) {

  //           } else if (count === 1) {
  //             value = value1;
  //           } else if (value != value1 && value != '' && count > 1) {
  //             value = '';
  //           }
  //           console.log("Value :" + value);
  //           // need to check value here
  //         }
  //       });
  //       if (count == this.revitdata.length) {
  //         // this.restdata.push(element);
  //         element.RevitWsSessionId = element.RevitWsSessionId;
  //         if (value === '') {
  //           this.setValueForCommonData(element, value);
  //         }
  //         this.restdata.push(element);
  //       }
  //     }
  //   });
  //   var distinctParameterValues = this.restdata.filter(
  //     (thing, i, arr) => arr.findIndex(t => t.GUID === thing.GUID) === i
  //   );
  //   distinctParameterValues.forEach(ele => {
  //     this.elementParameters.push(ele);
  //   });
  //   distinctParameterValues = [];
  //   this.restdata = [];
  // }

  // GetBUILTINCommonData() {
  //   let count = 0;
  //   let value = '';
  //   this.commondata.forEach(element => {
  //     count = 0;
  //     value = '';
  //     if (element.BUILTIN != null) {
  //       this.commondata.forEach(element1 => {
  //         if (element1.BUILTIN === element.BUILTIN) {
  //           count++;
  //           var value1 = this.getValue(element1, false);
  //           if (value === value1 && count > 1) {

  //           } else if (count === 1) {
  //             value = value1;
  //           } else if (value != value1 && value != '' && count > 1) {
  //             value = '';
  //           }
  //         }
  //       });
  //       if (count == this.revitdata.length) {
  //         // this.restdata.push(element);
  //         element.RevitWsSessionId = element.RevitWsSessionId;
  //         if (value === '') {
  //           this.setValueForCommonData(element, value);
  //         }
  //         this.restdata.push(element);
  //       }
  //     }

  //   });
  //   var distinctParameterValues = this.restdata.filter(
  //     (thing, i, arr) => arr.findIndex(t => t.BUILTIN === thing.BUILTIN) === i
  //   );
  //   distinctParameterValues.forEach(ele => {
  //     this.elementParameters.push(ele);
  //   });
  //   distinctParameterValues = [];
  //   this.restdata = [];

  // }

  // GetGUIDSystemCommonData() {
  //   let count = 0;
  //   let value = '';
  //   this.Systemcommondata.forEach(element => {
  //     count = 0;
  //     value = '';
  //     if (element.GUID != null) {
  //       this.Systemcommondata.forEach(element1 => {
  //         if (element1.GUID === element.GUID) {
  //           count++;
  //           var value1 = this.getValue(element1, false);
  //           if (value === value1 && count > 1) {

  //           } else if (count === 1) {
  //             value = value1;
  //           } else if (value != value1 && value != '' && count > 1) {
  //             value = '';
  //           }
  //         }
  //       });
  //       if (count == this.revitdata.length) {
  //         // this.restdata.push(element);
  //         element.RevitWsSessionId = element.RevitWsSessionId;
  //         if (value === '') {
  //           this.setValueForCommonData(element, value);
  //         }
  //         this.restdata.push(element);
  //       }
  //     }
  //   });
  //   var distinctParameterValues = this.restdata.filter(
  //     (thing, i, arr) => arr.findIndex(t => t.GUID === thing.GUID) === i
  //   );
  //   distinctParameterValues.forEach(ele => {
  //     this.systemParameters.push(ele);
  //   });
  //   distinctParameterValues = [];
  //   this.restdata = [];
  //   //this.Systemcommondata=[];
  // }

  // GetBUILTINSystemCommonData() {
  //   let count = 0;
  //   let value = '';
  //   this.Systemcommondata.forEach(element => {
  //     count = 0;
  //     value = '';
  //     if (element.BUILTIN != null) {
  //       this.Systemcommondata.forEach(element1 => {
  //         if (element1.BUILTIN === element.BUILTIN) {
  //           count++;
  //           var value1 = this.getValue(element1, false);
  //           if (value === value1 && count > 1) {

  //           } else if (count === 1) {
  //             value = value1;
  //           } else if (value != value1 && value != '' && count > 1) {
  //             value = '';
  //           }
  //         }
  //       });
  //       if (count == this.revitdata.length) {
  //         // this.restdata.push(element);
  //         element.RevitWsSessionId = element.RevitWsSessionId;
  //         if (value === '') {
  //           this.setValueForCommonData(element, value);
  //         }
  //         this.restdata.push(element);
  //       }
  //     }

  //   });
  //   var distinctParameterValues = this.restdata.filter(
  //     (thing, i, arr) => arr.findIndex(t => t.BUILTIN === thing.BUILTIN) === i
  //   );
  //   distinctParameterValues.forEach(ele => {
  //     this.systemParameters.push(ele);
  //   });
  //   distinctParameterValues = [];
  //   this.restdata = [];
  // }

  revitDataCount(element) {
    var dcount = 0;
    this.revitdata.forEach(elementcat => {
      if (elementcat.ChildDetailItem == null) {
        if (element.Category === elementcat.Category) {
          dcount++;
        }
      } else {
        if (element.Category === elementcat.ChildDetailItem.Category) {
          dcount++;
        }
      }

    });
    return dcount;
  }


  transform(arr: any[], searchText: string, fieldName?: string): any[] {
    if (!arr) return [];
    if (!searchText) return arr;
    searchText = searchText.toLowerCase();
    return arr.filter((it: any) => {
      if (typeof it == 'string') {
        // return it.toLowerCase().includes(searchText);
      } else if (typeof it == 'number') {
        return it.toString().toLowerCase().includes(searchText);
      } else {
        return it[fieldName].toLowerCase().includes(searchText);
      }

    });
  }

  private _filterGroup(value: string): any[] {
    if (this.copyGroupChildData != null) {
      let test1 = this.copyGroupChildData
        .filter(item1 => {
          const filterValue = value.toLowerCase();
          if (item1.Name.toLowerCase().indexOf(filterValue) != -1) {
            return item1;
          }
        });
      var groupedChild = "";
      if (value) {
        groupedChild = _.mapValues(_.groupBy(test1, 'FamilyName'))
      } else {
        groupedChild = _.mapValues(_.groupBy(this.copyGroupChildData, 'FamilyName'))
      }

      this.familyInstanceSelectedData = [...Object.values(groupedChild)];
      //   console.log(test1,22222)

      return this.familyInstanceSelectedData;
    }
  }

  private _filterGroupLink(value: string): any[] {
    let test1 = this.copyGroupChildData1
      .filter(item1 => {
        const filterValue = value.toLowerCase();
        if (item1.Name != undefined && item1.Name.toLowerCase().indexOf(filterValue) != -1) {
          return item1;
        }
      });
    var groupedChild = "";
    if (value) {
      groupedChild = _.mapValues(_.groupBy(test1, 'FamilyName'))
    } else {
      groupedChild = _.mapValues(_.groupBy(this.copyGroupChildData1, 'FamilyName'))
    }

    this.familyInstanceSelectedData = [...Object.values(groupedChild)];
    //   console.log(test1,22222)

    return this.familyInstanceSelectedData;
  }

}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};