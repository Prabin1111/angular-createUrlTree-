import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstant } from '@sharedModule/constants';

const { securedPageInitials } = RouteConstant;
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@secureFeature/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecuredRoutingModule {}
