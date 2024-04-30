import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  options: AnimationOptions = {
    path: './assets/animation/search.json',
  };

  animationCreated(animationItem: AnimationItem): void {}

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '70%',
    margin: '0 auto',
  };
}
