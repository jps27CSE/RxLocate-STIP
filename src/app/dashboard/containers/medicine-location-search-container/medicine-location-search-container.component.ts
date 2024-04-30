import { Component } from '@angular/core';
import { SearchFormComponent } from '../../views/search-form/search-form.component';

@Component({
  selector: 'app-medicine-location-search-container',
  standalone: true,
  imports: [SearchFormComponent],
  templateUrl: './medicine-location-search-container.component.html',
  styleUrl: './medicine-location-search-container.component.css',
})
export class MedicineLocationSearchContainerComponent {}
