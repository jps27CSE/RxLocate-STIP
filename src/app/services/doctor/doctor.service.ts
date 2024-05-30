import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorApiURL = `${environment.API_BASE_URL}/doctor`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  Search_by_Drug(drug: string): Observable<any> | null {
    const url = `${this.doctorApiURL}/doctor-list-by-drug/${drug}`;
    const token = this.localStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        authorization: `Bearer ${token}`,
      });
      return this.http.get(url, { headers });
    } else {
      console.log('Token not available');
      return null;
    }
  }
}
