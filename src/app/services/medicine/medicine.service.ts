import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private mapApiUrl = `${environment.API_BASE_URL}/map`;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  Get_All_Drugs(): Observable<any> | null {
    const url = `${this.mapApiUrl}/drugs`;
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

  Search_By_Drug(drug: string): Observable<any> | null {
    const url = `${this.mapApiUrl}/${drug}`;
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
