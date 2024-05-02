import { Component } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  isLoggedIn(): boolean {
    return !!this.localStorageService.getToken();
  }

  logout(): void {
    this.localStorageService.removeFromLocal();
    this.router.navigate(['/login']);
  }
}
