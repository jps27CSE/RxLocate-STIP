import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-map-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './map-details.component.html',
  styleUrl: './map-details.component.css',
})
export class MapDetailsComponent {
  @Input() fullData!: any;
}
