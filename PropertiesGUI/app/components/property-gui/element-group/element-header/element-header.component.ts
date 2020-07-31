import { Component, OnInit, Input, EventEmitter, Output, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelectFilterModule } from 'mat-select-filter';
import { threadId } from 'worker_threads';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-element-header',
  templateUrl: './element-header.component.html',
  styleUrls: ['./element-header.component.scss']
})


export class ElementHeaderComponent implements OnInit {
  public bankGroupsFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  @Input() myControl ; 

  @Input() imageData;
 // @Input() imageDataLinked;
  @Input() revitdatanew;
  @Input() revitdatalength;
  @Input() currentFamilyNameInstanceSelected;
  @Input() currentFamilyInstanceSelected;
  @Input() familyInstanceSelectedData;
  @Input() circuitDiv;
  filterFamilyInstanceSelectedData ;
  temp;
  @Output() changeFamilyNameInstanceSelectedEvent = new EventEmitter();
  
  constructor(private sanitizer: DomSanitizer, ) {
   
   }

  ngOnInit() {
    //this.temp = this.familyInstanceSelectedData; 
    if(this.familyInstanceSelectedData !== undefined){    
      this.familyInstanceSelectedData.forEach(element => {
        this.temp = element;
      });
    }
    
    // load the initial bank list
   // this.filterFamilyInstanceSelectedData.next(this.copyBankGroups(this.familyInstanceSelectedData ));

    // listen for search field value changes
    // this.bankGroupsFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterBankGroups();
    //   });
  }

  showImage() {
    let str = "data:image/jpeg;base64, null";
   return this.imageData.changingThisBreaksApplicationSecurity !== str;   
  }
  getRevitDataLength(){
    if(this.revitdatalength!=undefined){
      return this.revitdatalength;
    }else if(this.revitdatanew!=undefined){
      return this.revitdatanew.length;
    }
  }
  hasImageData(element){
    if(element.Image != undefined && element.Image.Data!= undefined && element.Image.Data != ""){
      return true
    }else{
      return false
    }
  }
  imageUrl(element) {
    if(element.Image != undefined && element.Image.Data!= undefined && element.Image.Data != ""){
      return this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64, " + element.Image.Data);
    }else{
      return ""
    }
    
  }
  changeFamilyNameInstanceSelected(event) {
    this.changeFamilyNameInstanceSelectedEvent.emit(event);
  }
  
  
  filterControl;

  filterfamilyInstanceSelectedData(searchText){
    let result = [];
    this.familyInstanceSelectedData.forEach(element => {
      this.temp = element;
      for(let i=0; i < element.length;i++){
        let _group= Object.assign([],element[i]);
           //  console.log(JSON.stringify(_group))  
             let _filterGroupItemList=_group.filter((item)=>{
               if(item.Name && searchText){
                return  item.Name.toLowerCase().includes(searchText.toLowerCase()); 
               }
               return false;                             
             });
             if(_filterGroupItemList.length){   
           result.push(_filterGroupItemList);
             }
      } 
    });
    if(result.length){
    this.temp = result;   
    }
   
  }
  
  // filterBankGroups() {
  //   if (!this.familyInstanceSelectedData) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.bankGroupsFilterCtrl;
  //   console.log(search);
  //   const bankGroupsCopy = this.copyBankGroups(this.familyInstanceSelectedData);
  //   if (!search) {
  //     this.filterFamilyInstanceSelectedData.next(bankGroupsCopy);
  //     return;
  //   } else {
  //    // search = search.toLowerCase();
  //   }
  //   // filter the banks
  //   this.filterFamilyInstanceSelectedData.next(
  //     bankGroupsCopy.filter(bankGroup => {
  //       const showBankGroup = bankGroup.name.toLowerCase().indexOf(search) > -1;
  //       if (!showBankGroup) {
  //         bankGroup.banks = bankGroup.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1);
  //       }
  //       return bankGroup.banks.length > 0;
  //     })
  //   );
  // }

  // protected copyBankGroups(bankGroups: any[]) {
  //   const bankGroupsCopy = [];
     
  //   bankGroups.forEach(bankGroup => {
  //     bankGroupsCopy.push({
  //       name: bankGroup[0].FamilyName,
  //       banks: bankGroup.slice(),
  //       test:"test"
  //     });
  //   });
  //   return bankGroupsCopy;
  // }
}
