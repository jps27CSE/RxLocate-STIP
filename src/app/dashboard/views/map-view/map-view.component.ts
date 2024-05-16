import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements OnInit {
  map: any;
  @Input() fullData!: any;
  defaultLocationLat = 23.8058536;
  defaultLocationLng = 90.4143504;
  locations = [
    {
      lat: 23.7806615,
      lng: 90.4112899,
      name: 'Gulshan-1',
    },
    {
      lat: 23.7947552,
      lng: 90.3954059,
      name: 'Banani',
    },
    {
      lat: 23.7470303,
      lng: 90.3655623,
      name: 'Dhanmondi',
    },
    {
      lat: 23.7945624,
      lng: 90.3435587,
      name: 'Mirpur-1',
    },
    {
      lat: 23.8766322,
      lng: 90.3576884,
      name: 'Uttara',
    },
  ];

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['fullData'] && this.fullData) {
  //     this.configMap();
  //   }
  // }

  ngOnInit() {
    this.configMap();
  }

  configMap() {
    this.map = L.map('map', {
      center: [
        this.fullData?.locationLat || this.defaultLocationLat,
        this.fullData?.locationLng || this.defaultLocationLng,
      ],
      zoom: this.fullData ? 16 : 9,
    });

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    this.locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng])
        .addTo(this.map)
        .bindPopup(
          `<div class="card-body">
        <h2 class="text-2xl font-bold mx-auto">${location.name}</h2>
        <button class="btn btn-primary h-4" >View Details</button>
      </div>`,
        );
    });

    // Optionally, you can also add a circle for each location
    this.locations.forEach((location) => {
      L.circle([location.lat, location.lng], {
        color: '#b2d9ed',
        fillColor: '#b2d9ed',
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(this.map);
    });

    // L.marker([this.fullData?.locationLat, this.fullData?.locationLng])
    //   .addTo(this.map)
    //   .bindPopup(
    //     '  <div class="card-body">\n' +
    //       '<h2 class="text-md font-bold mx-auto">' +
    //       (this.fullData?.locationName || '') +
    //       '</h2>' +
    //       // Conditionally show prescription count only if it's not zero
    //       (this.fullData?.prescriptionCount !== 0
    //         ? '<h2 class="text-md font-bold mx-auto">' +
    //           'Count: ' +
    //           (this.fullData?.prescriptionCount || '') +
    //           '</h2>'
    //         : '') +
    //       '  </div>\n' +
    //       '</div>',
    //   )
    //   .openPopup();

    //   L.circle(
    //     [
    //       this.fullData?.locationLat || this.defaultLocationLat,
    //       this.fullData?.locationLng || this.defaultLocationLng,
    //     ],
    //     {
    //       color: '#b2d9ed',
    //       fillColor: '#b2d9ed',
    //       fillOpacity: 0.5,
    //       radius: 500,
    //     },
    //   ).addTo(this.map);
    // }
  }
}
