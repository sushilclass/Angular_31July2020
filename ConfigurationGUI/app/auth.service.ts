import { Inject, Injectable, isDevMode } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as jwt_decode from 'jwt-decode';

import { AlertsService } from './alert.service';
import { OAuthSettings } from '../oauth';
import { User } from './user';
import { single } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { defer, Observable, interval, from, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticated: boolean;
  public user: User = new User();
  _webSocket: WebSocketSubject<any>;
  public static updateToken: any;
  private oAuthSettings = OAuthSettings;
  public tokenDevelopmentOnly;
  private tokenTimeOut = 0;
  private tokenLife = 0;
  private checkTokenObserver;

  constructor(
    private msalService: MsalService,
    private alertsService: AlertsService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.init();
    //this.jwtToken.subscribe(x => console.log(x));
  }

  async init(): Promise<void> {
    let token = await this.getAccessToken();
    this.verifyTokenObject(token);
  }

  verifyTokenObject(token) {
    let promiseSource = from(this.setUser());
    if (token != null) {
      if (isDevMode()) {
        this.tokenDevelopmentOnly = token;
      }
      try {
        let tokenObj = jwt_decode(token);
        this.tokenLife = (tokenObj.exp - tokenObj.iat) * 1000;
        console.log("this.tokenLife in min : " + (this.tokenLife / 1000) / 60);
        this.tokenTimeOut = (tokenObj.exp * 1000) - Date.now();
        console.log("this.tokenTimeOut in min : " + (this.tokenTimeOut / 1000) / 60);
        promiseSource.subscribe();
        //await this.setUser();
        this.authenticated = true;
      }
      catch{
        //catch should not happen...
        this.authenticated = false;
      }
    } else {
      this.authenticated = false;
    }

    if (this.authenticated) {
      this.checkTokenObserver = timer(this.tokenTimeOut, this.tokenLife);
      this.checkTokenObserver.subscribe(x => {
        let promiseSource = from(this.getAccessToken());
        const subscribe = promiseSource.subscribe(token => {
          this.verifyTokenObject(token);
        });
      });
    }

  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let token = await this.msalService.loginPopup(this.oAuthSettings.scopes)
      .catch((reason) => {
        this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });
    this.verifyTokenObject(token);
    //return token;
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;

  }


  // Silently request an access token
  async getAccessToken(): Promise<any> {
    var result;
    //For development for non-active directory users/personal accounts
    if (this.tokenDevelopmentOnly != undefined) {
      let token = jwt_decode(this.tokenDevelopmentOnly);
      if (token != undefined && token.exp * 1000 > Date.now()) {
        result = this.tokenDevelopmentOnly;
      }
    }
    if (result == undefined) {
      result = await this.msalService.acquireTokenSilent(this.oAuthSettings.scopes)
        .catch((reason) => {
          //this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
        });
      try {
        //results will be undefined when acquireTokenSilent requires 
        // new manual login or for personal account in development
        jwt_decode(result);
      } catch (error) {
        result = null;
        // if (reqSign) {
        //   this.authenticated = false;
        //   //result = await this.signIn();
        // } else {
        //   result = null;
        // }
      }
    }
    return result;
  }

  private async setUser() {
    let msalUser = this.msalService.getUser();
    if (msalUser != undefined) {
      this.user.displayName = msalUser.name;
      console.log("user.displayName: " + this.user.displayName);
      this.user.email = msalUser.displayableId;
    }
  }
}
