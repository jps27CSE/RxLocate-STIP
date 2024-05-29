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
  fullData: any;
  markers: any;
  @Input() set onUpdatedData(data: any) {
    this.fullData = [...(data || [])];
    console.log(this.fullData);
    if (this.fullData.length) {
      console.log(this.map);
      this.updateMap();
    }
  }
  loader: boolean = false;
  @Input() set loaderState(state: boolean) {
    this.loader = state;
  }
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
      zoom: this.fullData ? 8 : 7,
    });

    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(this.map);

    this.markers = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html:
            '<b class="text-2xl rounded-full bg-blue-500 text-white px-4 py-2">' +
            cluster.getChildCount() +
            '</b>',
        });
      },
    });

    this.map.addLayer(this.markers);
  }

  private updateMap() {
    this.markers.clearLayers();

    if (this.fullData[0]?.locationName) {
      this.map.setView(
        new L.LatLng(this.fullData[0].lat, this.fullData[0].lng),
        10,
      );
    }

    this.fullData?.forEach((location: any) => {
      const markerIcon = L.icon({
        iconUrl: `https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png`,
        iconSize: [50, 50],
        iconAnchor: [22, 41],
        popupAnchor: [1, -34],
        // shadowUrl: 'path_to_your_marker_icons/marker-shadow.png',
        shadowSize: [41, 41],
      });

      const marker = L.marker([location.lat, location.lng], {
        icon: markerIcon,
      }).bindPopup(
        `<div class="card-body h-32">
      <h2 class="text-2xl font-bold mx-auto">${location.divisionName ? location.divisionName : location.locationName}</h2>
      <p class="text-sm mx-auto">Prescribe Count: <span class="font-bold">${location.prescriptionCount}</span></p>
    </div>`,
      );
      this.markers.addLayer(marker);
    });

    // Optionally, you can also add a circle for each location
    this.fullData?.forEach((location: any) => {
      L.circle([location.lat, location.lng], {
        color: '#c3e7ef',
        fillColor: '#c3e7ef',
        fillOpacity: 0.5,
        radius: 50,
      }).addTo(this.map);
    });
  }
}
