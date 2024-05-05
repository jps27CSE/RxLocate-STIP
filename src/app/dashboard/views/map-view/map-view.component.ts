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
      zoom: 15,
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
      .bindPopup(
        '<div class="card w-48 h-52 bg-base-100 shadow-xl">\n' +
          '  <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQqIOF9xZgqVjy-A6LmnbCOaKZxwPzd922GDsu5hzs1Q&s" alt="Shoes" /></figure>\n' +
          '  <div class="card-body">\n' +
          '    <h2 class="text-md font-bold mx-auto">Square Health</h2>\n' +
          '  </div>\n' +
          '</div>',
      )
      .openPopup();
  }
}
