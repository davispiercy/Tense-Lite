import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimeEntryService {
  constructor(private http: HttpClient) { }
  getEntries(): Observable<any> {
    return this.http.get('http://localhost:8080/entries');
  }
}
