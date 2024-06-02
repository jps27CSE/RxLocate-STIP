import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private downloadAPI_URL = `${environment.API_BASE_URL}/excel`;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {}

  Download_by_Drug(drug: string): Observable<any> | null {
    const url = `${this.downloadAPI_URL}/division-data/${drug}`;
    const token = this.localStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        authorization: `Bearer ${token}`,
      });
      return this.http.get(url, { headers, responseType: 'blob' });
    } else {
      console.log('Token not available');
      return null;
    }
  }

  Search_by_Drug_Division(
    drug: string,
    division: string,
  ): Observable<any> | null {
    const url = `${this.downloadAPI_URL}/district-data/${drug}/${division}`;
    const token = this.localStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        authorization: `Bearer ${token}`,
      });
      return this.http.get(url, { headers, responseType: 'blob' });
    } else {
      console.log('Token not available');
      return null;
    }
  }
}
