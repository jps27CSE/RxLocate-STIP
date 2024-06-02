import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiUrl = `${environment.API_BASE_URL}/auth`;
  constructor(private http: HttpClient) {}

  loginUser(data: any): Observable<any> {
    const url = `${this.authApiUrl}/login`;
    return this.http.post(url, data, { responseType: 'text' });
  }
}
