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

const { loginPage } = RouteConstant;
@Injectable({
  providedIn: 'root',
})
export class CanLoadSecuredGuard implements CanLoad {
  constructor(
    private _navigationService: NavigationService,
    private _localStorageService: LocalStorageService,
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
    return this.isLoggedIn();
  }

  isLoggedIn(): boolean | UrlTree {
    if (this._authentication.checkLogin()) {
      return true;
    }
    this._authentication.logout();
    this._localStorageService.clear();
    return this._navigationService.createUrlTree([loginPage]);
  }
}
