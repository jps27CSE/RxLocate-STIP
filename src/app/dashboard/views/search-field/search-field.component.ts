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
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit {
  @Output() formSubmit: EventEmitter<{
    location: string;
    medicine: string;
    data?: any;
  }> = new EventEmitter();
  searchForm: FormGroup;

  selectedItem: string | undefined;
  filteredLocationSuggestions: string[] = [];
  locations: string[] = [];

  selectedDrugItem: string | undefined;
  filteredDrugSuggestions: string[] = [];
  drugs: string[] = [];

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
    });
  }

  ngOnInit() {
    this.fetchLocations();
    this.fetchDrugs();
  }

  onSubmit(): void {
    const locationValue = this.searchForm.value.location;
    const medicineValue = this.searchForm.value.medicine;

    if (medicineValue && !locationValue) {
      this.formSubmit.emit({ location: '', medicine: medicineValue });
    } else if (locationValue) {
      const formData = {
        location: locationValue,
        medicine: medicineValue || '',
      };
      this.formSubmit.emit(formData);
    } else {
      this.toastr.error('Please fill in at least one field before submitting.');
    }
  }

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

  filterDrugSuggestions(event: { query: string }) {
    this.filteredDrugSuggestions = this.drugs.filter((drug) =>
      drug.toLowerCase().includes(event.query.toLowerCase()),
    );
  }
}
