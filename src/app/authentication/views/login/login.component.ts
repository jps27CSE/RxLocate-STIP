import { Component, Input } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LottieComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  options: AnimationOptions = {
    path: './assets/animation/login.json',
  };

  animationCreated(animationItem: AnimationItem): void {}

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '800%',
    margin: '0 auto',
  };

  @Input() onSubmit!: void;
  // loginForm: FormGroup;
}
