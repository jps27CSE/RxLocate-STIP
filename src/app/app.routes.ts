import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './common/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing-page/landing-page.routes').then((c) => c.landingRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./authentication/authentication-page.routes').then(
        (c) => c.authenticationRoutes,
      ),
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
