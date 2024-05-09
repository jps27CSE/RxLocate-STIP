import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private mapApiUrl = 'http://localhost:8080/map';
  constructor(private http: HttpClient) {}

  Location_with_Medicine(data: any): Observable<any> {
    const url = `${this.mapApiUrl}/1`;
    return this.http.get(url, data);
  }
}
