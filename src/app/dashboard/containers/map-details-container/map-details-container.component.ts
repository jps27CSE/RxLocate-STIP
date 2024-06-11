import { Component, Input, input, OnInit, ViewChild } from '@angular/core';
import { MapDetailsComponent } from '../../views/map-details/map-details.component';
import { MapViewComponent } from '../../views/map-view/map-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../../../services/map/map.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { SearchFieldComponent } from '../../views/search-field/search-field.component';
import { MedicineService } from '../../../services/medicine/medicine.service';

@Component({
  selector: 'app-map-details-container',
  standalone: true,
  imports: [MapDetailsComponent, MapViewComponent, SearchFieldComponent],
  templateUrl: './map-details-container.component.html',
  styleUrl: './map-details-container.component.css',
})
export class MapDetailsContainerComponent implements OnInit {
  @ViewChild(SearchFieldComponent) searchFieldComponent!: SearchFieldComponent;
  location!: string;
  medicine!: string;
  fullData!: any;
  loader!: boolean;
  selectedLocation: string = '';
  selectedDivision: string = '';

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
    private medicineService: MedicineService,
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

  getLocationMedicineDivisionDistrict(
    drug: string,
    division: string,
    district: string,
  ): void {
    console.log('from new function', drug, division, district);
    this.loader = true;
    // @ts-ignore
    this.mapService
      .Get_Location_by_Medicine_Division_District(drug, division, district)
      .subscribe(
        (data) => {
          this.fullData = data;
          this.loader = false;
          console.log('Location Medicine Division District Data:', data);
        },
        (error) => {
          this.loader = false;
          this.local.removeFromLocal();
          this.router.navigate(['/login']);
          console.error(
            'Error fetching location medicine division district data:',
            error,
          );
        },
      );
  }

  onSubmit(event: {
    location: string;
    medicine: string;
    district?: string;
    data?: any;
  }) {
    if (event.medicine && event.location === '') {
      this.getMedicine(event.medicine);
    } else if (event.medicine && event.location && event.district === '') {
      this.getLocationMedicine(event.location, event.medicine);
    } else if (event.medicine && event.location && event.district) {
      this.getLocationMedicineDivisionDistrict(
        event.medicine,
        event.location,
        event.district,
      );
    }
  }

  onLocationClick(location: string): void {
    this.selectedLocation = location;
  }
  onDistrictClick(district: string): void {
    // Update the district value in the search field component
    console.log(district);
    this.searchFieldComponent.setDistrictValue(district);
  }
}
