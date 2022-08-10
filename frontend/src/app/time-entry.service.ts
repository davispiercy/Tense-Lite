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
  getUserEntriesByDate(id: number, date: String): Observable<any> {
    return this.http.get(`http://localhost:8080/entriesByDate/${id}/${date}`);
  }
  getEntriesUserProject(user: number, project: number): Observable<any> {
    return this.http.get(`http://localhost:8080/entries/${user}/${project}`);
  }
  addEntry(user_id: number, project_id: number, data: any, rate: number): Observable<any>{
    let value = rate * data.hours;
    console.log(data);
    return this.http.post('http://localhost:8080/addEntry/',
    { "user_id": user_id, "project_id": project_id, "entry_date": data.entry_date,
    "notes": data.notes, "hours": data.hours, "hourly_rate": rate, "entry_value": value },
    {responseType: 'json'}
    );
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/deleteEntry/${id}`);
  }
  addBlank(user_id: number, date: Date): Observable<any> {
    return this.http.post('http://localhost:8080/addEntry/',
    { "user_id": user_id, "project_id": 0, "entry_date": date, "notes": "", "hours": 0, "hourly_rate": 0, "entry_value": 0},
    {responseType: 'json'}
    );
  }
  /*editEntry(id: number, user_id: number, project_id: number, data: any, rate: number): Observable<any>{
    let value = rate * data.hours;
    return this.delete(id).subscribe((response) =>
      { this.http.post('http://localhost:8080/addEntry/',
      { "user_id": user_id, "project_id": project_id, "entry_date": data.entry_date,
      "notes": data.notes, "hours": data.hours, "hourly_rate": rate, "entry_value": value },
      {responseType: 'json'}
      ); });
  }*/
}
