import { Component, OnInit } from '@angular/core';
import { MapDetailsComponent } from '../../views/map-details/map-details.component';
import { MapViewComponent } from '../../views/map-view/map-view.component';
import { ActivatedRoute } from '@angular/router';
import { MapService } from '../../../services/map/map.service';

@Component({
  selector: 'app-map-details-container',
  standalone: true,
  imports: [MapDetailsComponent, MapViewComponent],
  templateUrl: './map-details-container.component.html',
  styleUrl: './map-details-container.component.css',
})
export class MapDetailsContainerComponent implements OnInit {
  location!: string;
  medicine!: string;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.location = params['location'];
      this.medicine = params['medicine'];
    });

    console.log(this.location, this.medicine);
  }
}
