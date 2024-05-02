import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  loginUser(data: any): Observable<any> {
    const url = `${this.authApiUrl}/login`;
    return this.http.post(url, data, { responseType: 'text' });
  }
}
