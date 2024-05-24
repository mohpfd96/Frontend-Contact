import { AuthConfig } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

const googleOAuth2Config: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin.concat('/google_auth'),
  clientId:
    '855181694473-c47dgr65vl9rtejeoeckvcp94am4gjt0.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(googleOAuth2Config);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }
}
