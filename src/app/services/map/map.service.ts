import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private mapApiUrl = `${environment.API_BASE_URL}`;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  Get_All_Locations(): Observable<any> | null {
    const url = `${this.mapApiUrl}/division/list`;

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

  Get_Location_Medicine(
    location: string,
    medicine: string,
  ): Observable<any> | null {
    const url = `${this.mapApiUrl}/map/summary?drugName=${medicine}&divisionName=${location}`;

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

  Get_Location_by_Medicine_Division_District(
    drug: string,
    division: string,
    district: string,
  ): Observable<any> | null {
    const url = `${this.mapApiUrl}/map/${drug}/${division}/${district}`;

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
