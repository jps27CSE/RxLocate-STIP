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

    this.getLocationMedicine(this.location, this.medicine);
  }
  getLocationMedicine(location: string, medicine: string): void {
    // @ts-ignore
    this.mapService.Get_Location_Medicine(location, medicine).subscribe(
      (data) => {
        // Handle the response data here
        this.fullData = data;
        console.log('Location Medicine Data:', data);
      },
      (error) => {
        this.local.removeFromLocal();
        this.router.navigate(['/login']);
        console.error('Error fetching location medicine:', error);
      },
    );
  }
}
