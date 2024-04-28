import { Component } from '@angular/core';
import { BannerComponent } from '../../views/banner/banner.component';
import { FeaturesComponent } from '../../views/features/features.component';

@Component({
  selector: 'app-landing-page-container',
  standalone: true,
  imports: [BannerComponent, FeaturesComponent],
  templateUrl: './landing-page-container.component.html',
  styleUrl: './landing-page-container.component.css',
})
export class LandingPageContainerComponent {}
