import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  private mapApiUrl = `${environment.API_BASE_URL}/prescriptions/by-location`;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  Get_All_Prescription(location: any): Observable<any> | null {
    const url = `${this.mapApiUrl}/${location}`;
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
