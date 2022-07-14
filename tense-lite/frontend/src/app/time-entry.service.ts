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
  getUserEntries(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/entries/${id}`);
  }
  addEntry(data: any): Observable<any>{
    return this.http.post('http://localhost:8080/addEntry/',
    { "user_id": data.user_id, "project_id": data.project_id, "entry_date": data.entry_date,
    "notes": data.notes, "hours": data.hours, "billable": data.billable },
    {responseType: 'json'}
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteEntry/${id}`);
  }
  editEntry(id: number, data: any): Observable<any>{
    console.log(id);
    return this.http.patch('http://localhost:8080/updateEntry',
      { "id": id, "user_id": data.user_id, "project_id": data.project_id, "entry_date": data.entry_date,
      "notes": data.notes, "hours": data.hours, "billable": data.billable },
      {responseType: 'json'}
    );
  }
}
