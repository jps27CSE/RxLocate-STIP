import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () =>
      import("./landing-page/landing-page.routes").then((c) => c.landingRoutes)
  }
];
