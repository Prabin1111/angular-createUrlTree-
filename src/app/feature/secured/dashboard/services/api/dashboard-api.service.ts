import { Injectable } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(private _authenticationService: AuthenticationService) {}

  logout(): void {
    this._authenticationService.logout();
  }
}
