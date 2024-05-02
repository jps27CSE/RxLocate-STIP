import { MedicineLocationSearchContainerComponent } from './containers/medicine-location-search-container/medicine-location-search-container.component';
import { MapDetailsContainerComponent } from './containers/map-details-container/map-details-container.component';
import { AuthGuard } from '../services/authGuard/auth.guard';

export const dashboardRoutes = [
  // {
  //   path: '',
  //   redirectTo: 'search',
  //   pathMatch: 'full',
  // },
  {
    path: 'search',
    component: MedicineLocationSearchContainerComponent,
  },
  {
    path: 'map',
    component: MapDetailsContainerComponent,
  },
];
