import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { NgOptimizedImage } from '@angular/common';
import { FooterComponent } from './common/footer/footer.component';
import { AuthGuard } from './services/authGuard/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgOptimizedImage, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RxLocate-STIP';
}
