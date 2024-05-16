import { Component, Input, input, OnInit } from '@angular/core';
import { MapDetailsComponent } from '../../views/map-details/map-details.component';
import { MapViewComponent } from '../../views/map-view/map-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../../../services/map/map.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-map-details-container',
  standalone: true,
  imports: [MapDetailsComponent, MapViewComponent],
  templateUrl: './map-details-container.component.html',
  styleUrl: './map-details-container.component.css',
})
export class MapDetailsContainerComponent implements OnInit {
  location!: string;
  medicine!: string;
  fullData!: any;

  loader!: boolean;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private local: LocalStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.location = params['location'];
      this.medicine = params['medicine'];
    });
  }

  getLocationMedicine(location: string, drug: string): void {
    this.loader = true;
    // @ts-ignore
    this.mapService.Get_Location_Medicine(location, drug).subscribe(
      (data) => {
        // Handle the response data here
        this.fullData = data;
        this.loader = false;
        console.log('Location Medicine Data:', data);
      },
      (error) => {
        this.loader = false;
        this.local.removeFromLocal();
        this.router.navigate(['/login']);
        console.error('Error fetching location medicine:', error);
      },
    );
  }

  searchClicked(event: { location: string; medicine: string }) {
    console.log('from:', event.location, event.medicine);
    this.getLocationMedicine(event.location, event.medicine);
  }
}
