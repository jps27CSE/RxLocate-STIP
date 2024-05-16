import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { MedicineService } from '../../../services/medicine/medicine.service';
import { MapService } from '../../../services/map/map.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-map-details',
  standalone: true,
  imports: [
    RouterLink,
    AutoCompleteModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './map-details.component.html',
  styleUrl: './map-details.component.css',
})
export class MapDetailsComponent implements OnInit {
  @Input() fullData!: any;
  @Output() searchClicked: EventEmitter<{
    location: string;
    medicine: string;
  }> = new EventEmitter();
  protected searchForm: any;

  constructor(
    private fb: FormBuilder,
    private local: LocalStorageService,
    private getDrugs: MedicineService,
    private getLocation: MapService,
    private router: Router,
  ) {
    this.searchForm = this.fb.group({
      location: ['', [Validators.required]],
      medicine: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.fetchLocations();
    this.fetchDrugs();

    console.log(this.drugs);
  }
  // for get all map location
  selectedItem: string | undefined;
  filteredLocationSuggestions: string[] = [];
  locations: string[] = [];

  fetchLocations() {
    // @ts-ignore
    this.getLocation.Get_All_Locations().subscribe(
      (response: any) => {
        this.locations = response.map((location: any) => location.name);
      },
      (error) => {
        console.error('Error fetching locations:', error);
        this.local.removeFromLocal();
        this.router.navigate(['/login']);
      },
    );
  }

  filterLocationSuggestions(event: { query: string }) {
    this.filteredLocationSuggestions = [];
    // Filter suggestions from the fetched locations array
    this.filteredLocationSuggestions = this.locations.filter((location) =>
      location.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

  //for get all drugs
  selectedDrugItem: string | undefined;
  filteredDrugSuggestions: string[] = [];
  drugs: string[] = [];

  fetchDrugs() {
    // @ts-ignore
    this.getDrugs.Get_All_Drugs().subscribe(
      (response: any) => {
        this.drugs = response.map((drug: any) => drug.name);
      },
      (error) => {
        console.error('Error fetching drugs:', error);
        this.local.removeFromLocal();
        this.router.navigate(['/login']);
      },
    );
  }

  filterDrugSuggestions(event: { query: string }) {
    // Filter suggestions from the fetched locations array
    this.filteredDrugSuggestions = this.drugs.filter((location) =>
      location.toLowerCase().includes(event.query.toLowerCase()),
    );
  }
  onSearchClicked() {
    console.log('clicked');
    if (this.searchForm.valid) {
      this.searchClicked.emit(this.searchForm.value);
    } else {
      // Handle error or notify user if any field is empty
    }
  }
}
