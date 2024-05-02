import { Component } from '@angular/core';
import { MapDetailsComponent } from '../../views/map-details/map-details.component';
import { MapViewComponent } from '../../views/map-view/map-view.component';

@Component({
  selector: 'app-map-details-container',
  standalone: true,
  imports: [MapDetailsComponent, MapViewComponent],
  templateUrl: './map-details-container.component.html',
  styleUrl: './map-details-container.component.css',
})
export class MapDetailsContainerComponent {}
