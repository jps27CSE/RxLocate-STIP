import { Component, Input, input, OnInit } from '@angular/core';
import { MapDetailsComponent } from '../../views/map-details/map-details.component';
import { MapViewComponent } from '../../views/map-view/map-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../../../services/map/map.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { SearchFieldComponent } from '../../views/search-field/search-field.component';
import { PrescriptionService } from '../../../services/prescription/prescription.service';
import { MedicineService } from '../../../services/medicine/medicine.service';

@Component({
  selector: 'app-map-details-container',
  standalone: true,
  imports: [MapDetailsComponent, MapViewComponent, SearchFieldComponent],
  templateUrl: './map-details-container.component.html',
  styleUrl: './map-details-container.component.css',
})
export class MapDetailsContainerComponent implements OnInit {
  location!: string;
  medicine!: string;
  fullData!: any;
  loader!: boolean;
  selectedLocation: string = '';

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private medicineService: MedicineService,
    private prescriptionService: PrescriptionService,
    private local: LocalStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {}

  getMedicine(medicine: string): void {
    this.loader = true;

    this.medicineService.Search_By_Drug(medicine)?.subscribe(
      (data) => {
        this.fullData = data;
        console.log(this.fullData);
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.local.removeFromLocal();
        this.router.navigate(['/login']);
        console.error('Error fetching location medicine:', error);
      },
    );
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

  getAllPrescriptions(location: string): void {
    this.loader = true;
    const prescriptionObservable =
      this.prescriptionService.Get_All_Prescription(location);
    if (prescriptionObservable) {
      prescriptionObservable.subscribe(
        (data) => {
          // Handle the response data here
          this.fullData = data;
          this.loader = false;
          console.log(data);
        },
        (error) => {
          this.loader = false;
          this.local.removeFromLocal();
          this.router.navigate(['/login']);
          console.error('Error fetching prescriptions:', error);
        },
      );
    } else {
      this.loader = false;
      console.error('No token available to fetch prescriptions');
    }
  }

  onSubmit(event: { location: string; medicine: string }) {
    if (event.medicine && event.location === '') {
      this.getMedicine(event.medicine);
    } else if (event.medicine && event.location) {
      this.getLocationMedicine(event.location, event.medicine);
    }
  }

  onLocationClick(location: string): void {
    this.selectedLocation = location;
  }
}
