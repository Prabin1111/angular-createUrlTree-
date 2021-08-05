import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { localStorageConstant, RouteConstant } from '@sharedModule/constants';
import { NavigationService } from '@sharedModule/service';
import { Observable } from 'rxjs';

const {
  key: { accessToken },
} = localStorageConstant;

const { securedPageInitials } = RouteConstant;

@Injectable({
  providedIn: 'root',
})
export class CanLoadPublicGuard implements CanLoad {
  constructor(
    private _navigationService: NavigationService,
    private _authentication: AuthenticationService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedOut();
  }

  isLoggedOut(): boolean | UrlTree {
    if (this._authentication.checkLogin()) {
      console.log('i am from CanLoadPublicGuard');
      return this._navigationService.createUrlTree([securedPageInitials]);
    }
    return true;
  }
}
