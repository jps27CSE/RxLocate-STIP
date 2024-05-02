import { Component } from '@angular/core';
import { LoginComponent } from '../../views/login/login.component';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent {
  constructor(
    private authService: AuthService,
    private token_save: LocalStorageService,
    private router: Router,
  ) {}

  onSubmit(formData: { username: string; password: string }): void {
    console.log('username:', formData.username);
    console.log('Password:', formData.password);
    const data = {
      username: formData.username,
      password: formData.password,
    };

    this.authService.loginUser(data).subscribe(
      (response) => {
        console.log('login response:', response);
        this.token_save.saveToLocal(response);
        this.router.navigate(['/dashboard/search']);
      },
      (error) => {
        console.error('Error :', error);
      },
    );
  }
}
