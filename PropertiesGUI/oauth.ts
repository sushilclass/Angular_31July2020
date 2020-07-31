import { environment } from './environments/environment';

export const OAuthSettings = {
  authorityUrl: environment.authorityUrl,  // Client Id and App Id is same
  appId: environment.clientId,  // Client Id and App Id is same
  scopes: environment.scopes
   
};