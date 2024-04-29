import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: './assets/animation/login.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '800%',

    margin: '0 auto',
  };
}
