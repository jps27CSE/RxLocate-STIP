import { Component } from '@angular/core';
import { LoginComponent } from '../../views/login/login.component';
import { AuthService } from '../../../services/auth/auth.service';
import { LocalStorageService } from '../../../services/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface onInit {}

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css',
})
export class LoginContainerComponent implements onInit {
  constructor(
    private authService: AuthService,
    private token_save: LocalStorageService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.token_save.getToken()) {
      this.router.navigate(['/dashboard/map']);
    }
  }

  onSubmit(formData: { username: string; password: string }): void {
    const data = {
      username: formData.username,
      password: formData.password,
    };

    this.authService.loginUser(data).subscribe(
      (response) => {
        this.token_save.saveToLocal(response);
        this.toastr.success('Login Successfully');
        this.router.navigate(['/dashboard/map']);
      },
      (error) => {
        this.toastr.error('Invalid Credentials');
        console.error('Error :', error);
      },
    );
  }
}
