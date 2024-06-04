import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { saveAs } from 'file-saver';
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
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { ChipModule } from 'primeng/chip';
import { DownloadService } from '../../../services/download/download.service';

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
    ChipModule,
    NgClass,
    NgStyle,
  ],
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.css'],
})
export class MapDetailsComponent implements OnInit, OnChanges {
  @Input() fullData!: any;
  doctorData: any[] = [];
  filteredDoctorData: any[] = [];
  medicineInfoData: any = {};

  @Output() locationClicked: EventEmitter<string> = new EventEmitter<string>();
  searchForm: any;
  totalPrescriptionCount: number = 0;

  divisions: Array<string> = [
    'Dhaka',
    'Chattogram',
    'Khulna',
    'Barishal',
    'Sylhet',
    'Rajshahi',
    'Rangpur',
    'Mymensingh',
  ];
  selectedDivision: string = 'All';

  constructor(
    private fb: FormBuilder,
    private local: LocalStorageService,
    private medicineService: MedicineService,
    private downloadService: DownloadService,
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
    this.filteredDoctorData = [...this.doctorData];
    this.selectedDivision = 'All'; // Reset to 'All' when opening dialog
  }

  // doctor search by drug
  searchByDrug(drug: string): void {
    // @ts-ignore
    this.getDoctorInfo.Search_by_Drug(drug).subscribe(
      (response) => {
        this.doctorData = response;
        this.filteredDoctorData = [...this.doctorData]; // Initialize filtered data
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

  // Filter doctors by division
  filterByDivision(division: string): void {
    this.selectedDivision = division;
    if (division === 'All') {
      this.filteredDoctorData = [...this.doctorData];
    } else {
      this.filteredDoctorData = this.doctorData.filter(
        (doctor) => doctor.divisionName === division,
      );
    }
  }

  //Download by Drug
  downloadClick() {
    if (
      this.fullData &&
      this.fullData[0] &&
      this.fullData[0].drugName &&
      this.fullData[0].districtName
    ) {
      this.downloadExcel_by_Drug_Division();
    } else if (this.fullData && this.fullData[0] && this.fullData[0].drugName) {
      this.downloadExcel_by_Drug();
    }
  }

  downloadExcel_by_Drug(): void {
    if (this.fullData && this.fullData[0] && this.fullData[0].drugName) {
      const drugName = this.fullData[0].drugName;
      this.downloadService.Download_by_Drug(drugName)?.subscribe(
        (response) => {
          const blob = new Blob([response], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          saveAs(blob, `${drugName}_prescription_data.xlsx`);
        },
        (error) => {
          console.error('Error downloading the file', error);
        },
      );
    } else {
      console.log('No drug name available for download');
    }
  }

  downloadExcel_by_Drug_Division(): void {
    if (
      this.fullData &&
      this.fullData[0] &&
      this.fullData[0].drugName &&
      this.fullData[0].districtName
    ) {
      const drugName = this.fullData[0].drugName;
      const divisionName = this.fullData[0].divisionName;
      this.downloadService
        .Search_by_Drug_Division(drugName, divisionName)
        ?.subscribe(
          (response) => {
            const blob = new Blob([response], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, `${drugName}_${divisionName}_prescription_data.xlsx`);
          },
          (error) => {
            console.error('Error downloading the file', error);
          },
        );
    } else {
      console.log('No drug name available for download');
    }
  }
}
