import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements OnChanges {
  map: any;
  @Input() fullData!: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fullData'] && this.fullData) {
      this.configMap();
    }
  }

  configMap() {
    this.map = L.map('map', {
      center: [this.fullData?.locationLat, this.fullData?.locationLng],
      zoom: 16,
    });

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    L.marker([this.fullData?.locationLat, this.fullData?.locationLng])
      .addTo(this.map)
      .bindPopup(
        '<div class="card w-48 h-52 bg-base-100 shadow-xl">\n' +
          '  <figure><img src="https://i.pinimg.com/originals/08/f1/8f/08f18f99279bfc06cdcab2d5ca1227e2.gif" alt="Shoes" /></figure>\n' +
          '  <div class="card-body">\n' +
          '<h2 class="text-md font-bold mx-auto">' +
          (this.fullData?.locationName || '') +
          '</h2>' +
          '  </div>\n' +
          '</div>',
      )
      .openPopup();

    L.circle([this.fullData?.locationLat, this.fullData?.locationLng], {
      color: '#b2d9ed',
      fillColor: '#b2d9ed',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(this.map);
  }
}
