import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage/local-storage.service';
import { localStorageConstant } from '@sharedModule/constants';
import { LoginService } from '../services/api/login.service';
const {
  key: { accessToken },
} = localStorageConstant;

@Component({
  selector: 'dc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this._loginService.login();
  }

  setValue(): void {
    this._localStorageService.set(accessToken, 'thisisonlyfortest');
  }

  clearLocalStorage(): void {
    this._localStorageService.clear();
  }
}
