import { Component } from '@angular/core';
import { LoginComponent } from '../../views/login/login.component';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent {
  onSubmit(formData: { email: string; password: string }): void {
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
  }
}
