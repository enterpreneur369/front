import { Routes } from '@angular/router';
import { certGuard } from '../guard/cert.guard';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { VitalSignsComponent } from './vital-signs/vital-signs.component';
import { VitalSignsEditComponent } from './vital-signs-edit/vital-signs-edit.component';

export const accountRoutes: Routes = [
  { path: 'myaccount', component: MyAccountComponent, canActivate: [certGuard] },
  { path: 'vital-signs',
    component: VitalSignsComponent,
    children: [
      { path: 'new', component: VitalSignsEditComponent },
      { path: 'edit/:id', component: VitalSignsEditComponent },
    ],
    canActivate: [certGuard]
  },
  { path: 'not-403', component: Not403Component},
  { path: 'not-404', component: Not404Component}
];

