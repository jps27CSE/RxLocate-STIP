import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MapService } from '../../../services/map/map.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { MedicineService } from '../../../services/medicine/medicine.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    AutoCompleteModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.css',
})
export class SearchFieldComponent implements OnInit {
  @Output() formSubmit: EventEmitter<{ location: string; medicine: string }> =
    new EventEmitter();
  searchForm: FormGroup;

  division: Array<{ name: string }> = [
    { name: 'Dhaka' },
    { name: 'Chattogram' },
    { name: 'Rajshahi' },
    { name: 'Khulna' },
    { name: 'Barishal' },
    { name: 'Sylhet' },
    { name: 'Rangpur' },
    { name: 'Mymensingh' },
  ];
  selectedDivision: { name: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private getLocation: MapService,
    private getDrugs: MedicineService,
    private router: Router,
    private local: LocalStorageService,
    private toastr: ToastrService,
  ) {
    this.searchForm = this.fb.group({
      location: [''],
      medicine: [''],
    });
  }

  ngOnInit() {
    this.fetchLocations();
    this.fetchDrugs();
  }

  onSubmit(): void {
    const locationValue = this.searchForm.value.location;
    const medicineValue = this.searchForm.value.medicine;

    if (locationValue || medicineValue) {
      const formData = {
        location: locationValue,
        medicine: medicineValue,
      };
      this.formSubmit.emit(formData);
    } else {
      this.toastr.error('Please fill in at least one field before submitting.');
    }
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
}
