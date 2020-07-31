import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Customer } from './customer';
import { Observable, throwError, from, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
import { Action } from './action';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ConfigGUIServiceService {

  private userAuthToken: string;
  _webSocket: WebSocketSubject<any>;
  private promiseSource = from(this.authService.getAccessToken());
  public getRevitElements = new BehaviorSubject([]);
  public revitData = [];

  constructor(private authService: AuthService) {
    this._webSocket = webSocket({ url: environment.WSHOST });
    if (this._webSocket) {
      this._webSocket.subscribe(
        msg => console.log('message received: ' + msg),
        // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      );
      console.log("Connected using Web Socket");
    }
    this.subscribeGeneral();
    this._SyncWithWsRevitElementData();

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

  // Error Handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // Get JSON data using websocket
  _SyncWithWsRevitElementData() {

    this.promiseSource.subscribe(token => {
      if (token != null) {
        var action: Action = new Action();
        action.Action = "getJsonAllMechanicalGUI";
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
    // this.userAuthToken = token;
    // if (this.userAuthToken != null) {
    //   var action: Action = new Action();
    //   action.Action = "getJsonAllMechanicalGUI";
    //  // action.Action = "getJsonAll";
    //   //Need to change with Id_Token returned from authenticator
    //   action.IdToken = this.userAuthToken;
    //   //action.ParentElementUniqueId;
    //   this._webSocket.next(action);
    //   return this._webSocket.asObservable();
    // } else {
    //   //TODO need to redirect user to login page
    // }
  }

  // Send Mechanical data to Revit using websocket
  _sendData(_action, RevitData, RevitWsSessionId) {
    this.promiseSource.subscribe(token => {
      if (token != null) {
        var action: Action = new Action();
        action.Action = _action;
        action.data = JSON.stringify(RevitData);
        //Need to change with Id_Token returned from authenticator
        action.IdToken = token;
        action.RevitWsSessionId = RevitWsSessionId;
        //action.ParentElementUniqueId;
        this._webSocket.next(action);
        this._webSocket.asObservable();
      } else {
        //TODO need to redirect user to login page
      }
    });

  }


}
