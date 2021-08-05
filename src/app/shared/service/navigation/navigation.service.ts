import { Injectable } from '@angular/core';
import { Router, UrlCreationOptions, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private _router: Router) {}

  navigationTo(path: string): void {
    this._router.navigate([path]);
  }

  createUrlTree(
    commands: any[],
    navigationExtras?: UrlCreationOptions
  ): UrlTree {
    return this._router.createUrlTree(commands, navigationExtras);
  }
}
