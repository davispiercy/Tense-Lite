import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from './models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  createAssignment(data: any): Observable<any> {
    return this.http.post<Assignment>(
    'http://localhost:8080/createAssignment/',
    { "user_id": data.user_id, "project_id": data.project_id, "hourly_rate": data.hourly_rate,
    "start_date": data.start_date, "end_date": data.end_date, "enabled": data.enabled},
    {responseType: 'json'}
    );
  }
}
