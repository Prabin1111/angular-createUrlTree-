import { Injectable } from '@angular/core';
import {
  ApiUrlConstant,
  HttpParamsKey,
  localStorageConstant,
  RouteConstant,
} from '@sharedModule/constants';
import { LocalStorageService } from '@coreServices/local-storage/local-storage.service';
import { TokenInfo, User } from '@sharedModule/models';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MessageHandlerService } from '@coreServices/message-handler/message-handler.service';
import { HttpClientService } from '@coreServices/http-client/http-client.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '@sharedModule/service';

const {
  key: { accessToken },
} = localStorageConstant;

const { login, logout } = ApiUrlConstant;

const { securedPageInitials, publicPageInitials } = RouteConstant;
const { username, password } = HttpParamsKey;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private _localStorageService: LocalStorageService,
    private _messageHandlerService: MessageHandlerService,
    private _httpClient: HttpClientService,
    private _navigationSevice: NavigationService
  ) {}

  checkLogin(): boolean {
    return this.getToken() ? true : false;
  }

  logout(): void {
    if (navigator.onLine) {
      this._localStorageService.clear();
      this._navigationSevice.navigationTo(publicPageInitials);
      //   this._httpClient.post(logout, null).subscribe(
      //     (success) => {
      //       this._localStorageService.clear();
      //     },
      //     (error: HttpErrorResponse) => {
      //       this._localStorageService.clear();
      //     }
      //   );
    }
  }

  login(loginDetails: any): void {
    this._localStorageService.clear();
    this.setLoginStatus(false);

    const tokenInfo: TokenInfo = {
      access_token: 'ashfjhasfkjasdf',
      expires_in: 200,
      jti: 'fsdfsdfs',
      organization: 'prajna',
      refresh_token: 'hdshfjksdhkfjds',
      token_type: 'jwt',
    };
    this.storeTokenAndNavigate(tokenInfo, loginDetails.username);
    this.setLoginStatus(true);

    // this.getAccessToken(loginDetails).subscribe(
    //   (tokenInfo: TokenInfo) => {
    //     this.storeTokenAndNavigate(tokenInfo, loginDetails.username);
    //     this.setLoginStatus(true);
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.setLoginStatus(false);
    //     this._messageHandlerService.handleErrorMessage(err);
    //   }
    // );
  }

  private getAccessToken(loginData: User): Observable<TokenInfo> {
    const params = new HttpParams()
      .set(username, loginData.username)
      .set(password, loginData.password);
    return this._httpClient.post(login, null, params);
  }

  getToken(): string | null {
    return this._localStorageService.get(accessToken);
  }

  storeTokenAndNavigate(
    tokenInfo: TokenInfo,
    username: string
  ): boolean | void {
    if (tokenInfo && tokenInfo.access_token) {
      this.setTokenInLocalStorage(tokenInfo);
      this._navigationSevice.navigationTo(securedPageInitials);
    } else {
      this.setLoginStatus(false);
      this._localStorageService.clear();
    }
  }

  setTokenInLocalStorage(tokenInfo: TokenInfo): void {
    this._localStorageService.set(accessToken, tokenInfo.access_token);
  }

  setLoginStatus(value: boolean): void {
    this.loginStatus.next(value);
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  clearloaclStorage(): void {
    this._localStorageService.clear();
  }
}
