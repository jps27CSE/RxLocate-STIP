import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MapService } from '../../../services/map/map.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { MedicineService } from '../../../services/medicine/medicine.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    AutoCompleteModule,
    DropdownModule,
    NgIf,
    InputTextModule,
  ],
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit, OnChanges {
  @Output() formSubmit: EventEmitter<{
    location: string;
    medicine: string;
    district?: string;
    data?: any;
  }> = new EventEmitter();
  searchForm: FormGroup;
  filteredLocationSuggestions: string[] = [];
  locations: string[] = [];
  filteredDrugSuggestions: string[] = [];
  drugs: string[] = [];
  @Input() location!: string;

  showClearButton = false;
  protected filteredDistrictSuggestions: any;

  constructor(
    private fb: FormBuilder,
    private getLocation: MapService,
    private getDrugs: MedicineService,
    private router: Router,
    private local: LocalStorageService,
    private toastr: ToastrService,
  ) {
    this.searchForm = this.fb.group({
      selectedDivision: [null],
      location: [''],
      medicine: [''],
      district: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {
    this.fetchLocations();
    this.fetchDrugs();

    // Listen to changes in the location input field to show/hide the clear button and enable/disable district field
    this.searchForm.get('location')?.valueChanges.subscribe((value) => {
      this.showClearButton = !!value;
      if (value) {
        this.searchForm.get('district')?.enable();
      } else {
        this.searchForm.get('district')?.disable();
      }
    });
  }

  setDistrictValue(district: string): void {
    this.searchForm.get('district')?.setValue(district);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && !changes['location'].firstChange) {
      this.searchForm.get('location')?.setValue(this.location || '');
    }
  }

  onSubmit(): void {
    const locationValue = this.searchForm.value.location;
    const medicineValue = this.searchForm.value.medicine;
    const districtValue = this.searchForm.value.district;

    if (medicineValue && !locationValue && !districtValue) {
      this.formSubmit.emit({
        location: '',
        medicine: medicineValue,
        district: districtValue,
      });
    } else if ((locationValue && medicineValue) || districtValue) {
      const formData = {
        location: locationValue,
        medicine: medicineValue,
        district: districtValue,
      };
      this.formSubmit.emit(formData);
    } else {
      this.toastr.error('Please fill in Drug field before submitting.');
    }
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  fetchLocations() {
    // @ts-ignore
    this.getLocation.Get_All_Locations().subscribe(
      (response: any) => {
        this.locations = response.map((location: any) =>
          this.capitalizeFirstLetter(location.divisionName),
        );
      },
      (error) => {
        console.error('Error fetching locations:', error);
        this.local.removeFromLocal();
        this.router.navigate(['/login']);
      },
    );
  }

  filterLocationSuggestions(event: { query: string }) {
    this.filteredLocationSuggestions = this.locations.filter((location) =>
      location.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

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

  filterDistrictSuggestions(event: { query: string }) {
    const locationValue = this.searchForm.value.location;
    const medicineValue = this.searchForm.value.medicine;

    if (locationValue && medicineValue) {
      // Call the service method to fetch suggestions based on location and medicine
      this.getLocationMedicine(locationValue, medicineValue).subscribe(
        (response: any) => {
          // Extract district names from the response
          const districtSuggestions = response.map(
            (item: any) => item.districtName,
          );

          // Filter suggestions based on the user input
          this.filteredDistrictSuggestions = districtSuggestions.filter(
            (district: string) =>
              district.toLowerCase().includes(event.query.toLowerCase()),
          );
        },
        (error) => {
          console.error('Error fetching district suggestions:', error);
        },
      );
    }
  }

  getLocationMedicine(location: string, medicine: string): Observable<any> {
    const locationMedicine = this.getLocation.Get_Location_Medicine(
      location,
      medicine,
    );
    return locationMedicine ? locationMedicine : of(null);
  }

  filterDrugSuggestions(event: { query: string }) {
    this.filteredDrugSuggestions = this.drugs.filter((drug) =>
      drug.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

  clearInput(): void {
    this.searchForm.get('location')?.setValue('');
    this.onSubmit();
  }

  clearDistrictInput(): void {
    this.searchForm.get('district')?.setValue('');
    this.onSubmit();
  }
}
