import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { DialogModule } from 'primeng/dialog';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import { geocoder } from 'leaflet-control-geocoder';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  map: any;
  @Input() fullData!: any;
  defaultLocationLat = 23.8058536;
  defaultLocationLng = 90.4143504;

  ngOnInit() {
    this.configMap();
  }

  ngAfterViewInit() {}

  configMap() {
    this.map = L.map('map', {
      center: [
        this.fullData?.locationLat || this.defaultLocationLat,
        this.fullData?.locationLng || this.defaultLocationLng,
      ],
      zoom: this.fullData ? 10 : 10,
    });

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    // (L.Control as any).geocoder().addTo(this.map)

    // geocoder.on('markgeocode', function (event: any) {
    //   const { latlng, name } = event.geocode;
    //   console.log(
    //     `Latitude: ${latlng.lat}, Longitude: ${latlng.lng}, Name: ${name}`,
    //   );
    // });

    const markers = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html:
            '<b class="text-2xl rounded-full bg-blue-500 text-white px-4 py-2">' +
            cluster.getChildCount() +
            '</b>',
        });
      },
    });

    this.fullData?.forEach((location: any) => {
      const markerIcon = L.icon({
        iconUrl: `https://static.vecteezy.com/system/resources/previews/028/251/987/original/doctor-3d-icon-illustration-free-png.png`,
        iconSize: [70, 70],
        iconAnchor: [22, 41],
        popupAnchor: [1, -34],
        // shadowUrl: 'path_to_your_marker_icons/marker-shadow.png',
        shadowSize: [41, 41],
      });

      const marker = L.marker([location.lat, location.lng], {
        icon: markerIcon,
      }).bindPopup(
        `<div class="card-body h-32  ">
            <h2 class="text-2xl font-bold mx-auto">${location.divisionName}</h2>
            <p class="text-sm  mx-auto">Precribe Count: <span class="font-bold">${location.prescriptionCount}</span></p>
<!--            <button class="btn btn-primary h-4">View Details</button>-->
          </div>`,
      );
      markers.addLayer(marker);
    });

    this.map.addLayer(markers);

    // Optionally, you can also add a circle for each location
    // this.locations.forEach((location) => {
    //   L.circle([location.lat, location.lng], {
    //     color: '#c3e7ef',
    //     fillColor: '#c3e7ef',
    //     fillOpacity: 0.5,
    //     radius: 50,
    //   }).addTo(this.map);
    // });
  }
}
