import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getToken() {
    return localStorage.getItem('token');
  }

  saveToLocal(token: string) {
    localStorage.setItem('token', token);
  }

  removeFromLocal() {
    localStorage.removeItem('token');
  }
}
