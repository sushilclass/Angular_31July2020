import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Customer } from './propertygui';
import { Observable, throwError, of, NextObserver, from ,BehaviorSubject } from 'rxjs';
import { retry, catchError, } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { Action } from './action';
import { DomSanitizer } from '@angular/platform-browser';

//This should be removed
//let IDTOKENTEST = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkhsQzBSMTJza3hOWjFXUXdtak9GXzZ0X3RERSJ9.eyJhdWQiOiI0YTFhYTFkNS1jNTY3LTQ5ZDAtYWQwYi1jZDk1N2E0N2Y4NDIiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vN2I4ZjdhY2MtZTFjMC00NjdhLTg2ZTktNjc4MTQ0ZGE3ODgxL3YyLjAiLCJpYXQiOjE1ODE5Nzc0NjgsIm5iZiI6MTU4MTk3NzQ2OCwiZXhwIjoxNTgxOTgxMzY4LCJuYW1lIjoiSmFtZXMgTS4gRHJ1bW1vbmQiLCJvaWQiOiI0N2I2MzEyMi0zOWI2LTQ0NjYtYTRlYi04MzE1ZWQyNDYwOGEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJKYW1lcy5NLkRydW1tb25kQGltZWdjb3JwLmNvbSIsInN1YiI6IjBuWDNQYVFxZWxEZ21fUldBYXBFak5FYnN4UEdNOFlQNnhNSWllbXNiWHciLCJ0aWQiOiI3YjhmN2FjYy1lMWMwLTQ2N2EtODZlOS02NzgxNDRkYTc4ODEiLCJ1dGkiOiJucnFqX1RYUlQwLVJlMXBMaUZhbUFBIiwidmVyIjoiMi4wIn0.Mf5JpDG2Frcb-g0-J757NL_1Fxlu6FkrprnACDcUwVr3SBVkCXyL-WDtWiHfc7eLnXw7FnTReEoWHajVPkBlT_FNyAXJte0w4FgQZ2JyyEcAtRFS3Hl85TXCHU8P1L4m_SAxSJtjrsmB1831kbpreyX-pEN4fJ1AN5fDM9zwskPJZl06hKbZ4ntQ-E4nhzvBh3z-O7K_jWNOxj6X3rHJN35TpmI4EnU8S9wXOZNuKA2RWouRd3iOuZpW55HdPMDVd51r4UzHMv5VTl-Pxv6sk-J15XshT5tzFbGj254XPXH6uzAb4kWw1C024XLVWRCrRj7ieNpygK6djVkPPXh3tA';



@Injectable({
  providedIn: 'root'
})
export class PropertyGuiService {

  _webSocket: WebSocketSubject<any>;
  public wsConnected = false;
  public revitData = [];
  static openState = false;
  private promiseSource = from(this.authService.getAccessToken());

  constructor(private authService: AuthService) {
    this._webSocket = webSocket({
      url: environment.WSHOST,
      closeObserver: {
        next(closeEvent) {
          //const customError = { code: 1234, reason: "sample error" }
          this.wsConnected = true;
          //this.subscribeGeneral();
          //this._SyncWithWsRevitElementData();
          console.log(`Connected using Web Socket`);
        }
      },
      openObserver: {
        next() {
          //const customError = { code: 1234, reason: "sample error" }
          this.wsConnected = true;
          //this.subscribeGeneral();
          //this.subscribeGeneral();
          //this._SyncWithWsRevitElementData();
          console.log(`Connected using Web Socket`);
        }
      },

    });
    //this.authService.getAccessToken();
    this.subscribeGeneral();
    this._SyncWithWsRevitElementData();
  }

  getRevitElements = new BehaviorSubject([]);

  connect() {

  }

  subscribeGeneral() {
    this._webSocket.subscribe(
      msg => {
        console.log('message received: ' + msg)
      },
      // Called whenever there is a message from the server.
      err => {
        if (err.code == 1001)
          console.log(err)
      }, // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // Get JSON data using websocket
  _SyncWithWsRevitElementData() {
    this.promiseSource.subscribe(token => {
      if (token != null) {
        var action: Action = new Action();
        action.Action = "getJsonAll";
        //Need to change with Id_Token returned from authenticator
        action.IdToken = token;
        //action.ParentElementUniqueId;
        this._webSocket.next(action);
        this._webSocket.asObservable().subscribe(data => {
          this.revitData = data;
          this.getRevitElements.next(this.revitData);
        },
          error => {
            console.log(error)
          }
        );
      } else {
        //TODO need to redirect user to login page
      }
    });
  }

  // Update Parameter by GUId or BUILTIN using WebSocket
  _UpdateRevitParameter(uniqueId, value, Name, GUID, BUILTIN, DocumentHashCode, RevitWsSessionId){
    this.promiseSource.subscribe(token => {
      if (token != null) {
        var action: Action = new Action();
        action.Action = "setParameter";
        action.DocumentHashCode = DocumentHashCode;
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        if (typeof uniqueId == 'string') {
          action.GUID = GUID;
          action.BUILTIN = BUILTIN;
          action.ParentElementUniqueId = uniqueId;
          action.Value = value;
          action.Name = Name;
        }
        else {
          uniqueId.forEach(id => {
            var actionHold: Action = new Action();
            actionHold.Action = "setParameter";
            actionHold.DocumentHashCode = DocumentHashCode;
            actionHold.IdToken = token;
            actionHold.RevitWsSessionId = RevitWsSessionId;
            actionHold.GUID = GUID;
            actionHold.BUILTIN = BUILTIN;
            actionHold.ParentElementUniqueId = id;
            actionHold.Value = value;
            action.Name = Name;
            if (action.ActionArray == undefined) {
              action.ActionArray = [actionHold];
            } else {
              action.ActionArray.push(actionHold);
            }
          });
        }
        this._webSocket.next(action);
        return this._webSocket.asObservable();
      }
    });
  }

  // Send Selected Family Name to Revit
  _CurrentType(ElementUniqueId, Value, RevitWsSessionId, DocumentHashCode) {
    this.promiseSource.subscribe(token => {
      if (token != null) {
        var action: Action = new Action();
        action.Action = "changeType";
        action.ElementUniqueId = ElementUniqueId;
        action.Value = Value;
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        action.DocumentHashCode = DocumentHashCode;
        this._webSocket.next(action);
      }
    });
  }

  // send data on Edit Type button click
  _EditType(RevitWsSessionId, DocumentHashCode) {
    this.promiseSource.subscribe(token => {
      if (token != null) {
        var action: Action = new Action();
        action.Action = "showTypeProperties";
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        action.DocumentHashCode = DocumentHashCode;
        this._webSocket.next(action);
      }
    });
  }

  // send data on Linked Detail Id button click
  _LinkedDetailId(value, DocumentHashCode, RevitWsSessionId) {
    this.promiseSource.subscribe(token => {
      if (token != null) {
        var action: Action = new Action();
        action.Action = "showElement";
        action.Value = value;
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        action.DocumentHashCode = DocumentHashCode;
        this._webSocket.next(action);
        return this._webSocket.asObservable();
      }
    });
  }

  // send selected Phase Id on dropdown change
  _selectedPhaseId(value, RevitWsSessionId, DocumentHashCode, ElementUniqueId) {
    this.promiseSource.subscribe(token =>{
      if(token != null){
        var action: Action = new Action();
        action.Action = "phaseCreated";
        action.Value = value;
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        action.DocumentHashCode = DocumentHashCode;
        action.ElementUniqueId = ElementUniqueId;
        this._webSocket.next(action);
        return this._webSocket.asObservable();
      }
    } );    
  }

  // send selected Phase Demolished Id on dropdown change
  _selectedPhaseDemolishId(value, RevitWsSessionId, DocumentHashCode, ElementUniqueId){
    this.promiseSource.subscribe(token =>{
      if(token != null){
        var action: Action = new Action();
        action.Action = "phaseDemolished";
        action.Value = value;
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        action.DocumentHashCode = DocumentHashCode;
        action.ElementUniqueId = ElementUniqueId;
        this._webSocket.next(action);
        return this._webSocket.asObservable();
      }
    });    
  }

  // send drop down selection data
  _selectedDropdownElementId(_Action, value, BuiltInId, RevitWsSessionId, DocumentHashCode, ElementUniqueId){
    this.promiseSource.subscribe(token =>{
      if(token != null){
        var action: Action = new Action();
        action.Action = _Action;
        action.Value = value;
        action.BuiltInId = BuiltInId;
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        action.DocumentHashCode = DocumentHashCode;
        action.ElementUniqueId = ElementUniqueId;
        this._webSocket.next(action);
        return this._webSocket.asObservable();
      }
    });    
  }

  // send select model
  _selectedModelId(_Action, value, RevitWsSessionId, DocumentHashCode, ElementUniqueId){
    this.promiseSource.subscribe(token =>{
      if(token != null){
        var action: Action = new Action();
        action.Action = _Action;
        action.Value = value;
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        action.DocumentHashCode = DocumentHashCode;
        action.ElementUniqueId = ElementUniqueId;
        this._webSocket.next(action);
        return this._webSocket.asObservable();
      }
    });    
  }
}