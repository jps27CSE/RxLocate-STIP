import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { MapService } from '../../../services/map/map.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { MedicineService } from '../../../services/medicine/medicine.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    LottieComponent,
    ReactiveFormsModule,
    AutoCompleteModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<{
    location: string;
    medicine: string;
    district: string;
  }> = new EventEmitter();
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private getLocation: MapService,
    private router: Router,
    private local: LocalStorageService,
    private getDrugs: MedicineService,
  ) {
    this.searchForm = this.fb.group({
      location: ['', [Validators.required]],
      medicine: ['', [Validators.required]],
      district: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.fetchLocations();
    this.fetchDrugs();

    console.log(this.drugs);
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      this.formSubmit.emit(formData);
    } else {
      this.toastr.error('Please fill in all fields');
    }
  }

  options: AnimationOptions = {
    path: './assets/animation/search.json',
  };

  animationCreated(animationItem: AnimationItem): void {}

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '70%',
    margin: '0 auto',
  };
  protected readonly onsubmit = onsubmit;

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
    this.filteredDrugSuggestions = this.drugs.filter((location) =>
      location.toLowerCase().includes(event.query.toLowerCase()),
    );
  }
}
