import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements OnInit {
  ngOnInit() {
    this.configMap();
  }

  map: any;

  configMap() {
    this.map = L.map('map', {
      center: [23.78049269183336, 90.40754216930443],
      zoom: 6,
    });

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    L.marker([23.78049269183336, 90.40754216930443])
      .addTo(this.map)
      .bindPopup('Square Health.')
      .openPopup();
  }
}
