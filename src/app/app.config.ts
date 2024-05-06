import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './services/authGuard/auth.guard';
import { LocalStorageService } from './services/localStorage/local-storage.service';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideLottieOptions({
      player: () => player,
    }),
    provideAnimations(),
    provideToastr({ positionClass: 'toast-top-center' }),
  ],
};
