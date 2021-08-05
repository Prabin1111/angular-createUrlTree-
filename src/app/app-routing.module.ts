import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadPublicGuard } from '@guard/public/can-load-public.guard';
import { CanLoadSecuredGuard } from '@guard/secured/can-load-secured.guard';
import { RouteConstant } from '@sharedModule/constants';
const { securedPageInitials, publicPageInitials } = RouteConstant;
const routes: Routes = [
  {
    path: publicPageInitials,
    loadChildren: () =>
      import('@publicLayout/public.module').then(
        (module) => module.PublicModule
      ),
    canLoad: [CanLoadPublicGuard],
  },
  {
    path: securedPageInitials,
    loadChildren: () =>
      import('@securedLayout/secured.module').then(
        (module) => module.SecuredModule
      ),
    canLoad: [CanLoadSecuredGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
