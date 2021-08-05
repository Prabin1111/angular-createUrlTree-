import { Injectable } from '@angular/core';
import { AuthenticationService } from '@coreServices/authentication/authentication.service';
import { RouteConstant } from '@sharedModule/constants';
import { NavigationService } from '@sharedModule/service';

const { securedPageInitials } = RouteConstant;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private _navigationService: NavigationService,
    private _authenticationService: AuthenticationService
  ) {}

  login() {
    this._authenticationService.login({
      username: 'username',
      password: 'password',
    });
  }
}
