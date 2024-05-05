import { Component } from '@angular/core';
import { SearchFormComponent } from '../../views/search-form/search-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medicine-location-search-container',
  standalone: true,
  imports: [SearchFormComponent],
  templateUrl: './medicine-location-search-container.component.html',
  styleUrl: './medicine-location-search-container.component.css',
})
export class MedicineLocationSearchContainerComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onSubmit(formData: { location: string; medicine: string }): void {
    console.log('Location:', formData.location);
    console.log('Medicine:', formData.medicine);

    const queryParams = {
      location: formData.location,
      medicine: formData.medicine,
    };

    this.router.navigate(['/dashboard', 'map'], { queryParams });
  }
}
