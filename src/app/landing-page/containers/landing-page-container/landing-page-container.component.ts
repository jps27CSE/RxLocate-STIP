import { Component } from '@angular/core';
import { BannerComponent } from '../../views/banner/banner.component';
import { FeaturesComponent } from '../../views/features/features.component';
import { FaqSectionComponent } from '../../views/faq-section/faq-section.component';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { Router } from '@angular/router';

interface onInit {}

@Component({
  selector: 'app-landing-page-container',
  standalone: true,
  imports: [BannerComponent, FeaturesComponent, FaqSectionComponent],
  templateUrl: './landing-page-container.component.html',
  styleUrl: './landing-page-container.component.css',
})
export class LandingPageContainerComponent {}
