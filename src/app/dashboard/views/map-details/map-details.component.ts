import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
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
import { NgForOf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DoctorService } from '../../../services/doctor/doctor.service';

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
    NgForOf,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './map-details.component.html',
  styleUrl: './map-details.component.css',
})
export class MapDetailsComponent implements OnInit, OnChanges {
  @Input() fullData!: any;
  doctorData: any[] = [];
  medicineInfoData: any = {};

  @Output() locationClicked: EventEmitter<string> = new EventEmitter<string>();
  searchForm: any;
  totalPrescriptionCount: number = 0;

  constructor(
    private fb: FormBuilder,
    private local: LocalStorageService,
    private medicineService: MedicineService,
    private getLocation: MapService,
    private getDoctorInfo: DoctorService,
    private router: Router,
  ) {
    this.searchForm = this.fb.group({
      location: ['', [Validators.required]],
      medicine: ['', [Validators.required]],
    });
  }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fullData'] && this.fullData) {
      this.calculateTotalPrescriptionCount();

      if (this.fullData[0] && this.fullData[0].drugName) {
        this.searchByDrug(this.fullData[0].drugName);
      }

      if (this.fullData[0] && this.fullData[0].drugName) {
        this.medicineInfo(this.fullData[0].drugName);
      }
    }
  }

  drugs: string[] = [];

  onLocationClick(location: string): void {
    this.locationClicked.emit(location);
  }

  calculateTotalPrescriptionCount(): void {
    if (this.fullData) {
      this.totalPrescriptionCount = this.fullData.reduce(
        (total: any, data: { prescriptionCount: any }) =>
          total + data.prescriptionCount,
        0,
      );
    }
    console.log('pres', this.totalPrescriptionCount);
  }

  drugDialogVisible: boolean = false;
  doctorDialogVisible: boolean = false;

  showDrugDialog() {
    this.drugDialogVisible = true;
  }

  showDoctorDialog() {
    this.doctorDialogVisible = true;
  }

  // doctor search by drug
  searchByDrug(drug: string): void {
    // @ts-ignore
    this.getDoctorInfo.Search_by_Drug(drug).subscribe(
      (response) => {
        this.doctorData = response;
      },
      (error) => {
        console.error('Error fetching doctor data', error);
      },
    );
  }

  //medicine information
  medicineInfo(drug: string): void {
    this.medicineService.Medicine_Info(drug)?.subscribe(
      (response) => {
        this.medicineInfoData = response;
        console.log('from medicine information', this.medicineInfoData);
      },
      (error) => {
        console.error('Error fetching medicineInfo', error);
      },
    );
  }
}
