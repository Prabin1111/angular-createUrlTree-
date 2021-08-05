import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from './services/api/dashboard-api.service';

@Component({
  selector: 'dc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private _dashboardApiService: DashboardApiService) {}

  ngOnInit(): void {}

  logout(): void {
    this._dashboardApiService.logout();
  }
}
