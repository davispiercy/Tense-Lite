import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  createAssignment(user_id: number, project_id: number, hourly_rate: number): Observable<any> {
    let date = new Date();
    return this.http.post(
    'http://localhost:8080/createAssignment/',
    { "user_id": user_id, "project_id": project_id, "hourly_rate": hourly_rate,
    "start_date": date},
    {responseType: 'json'}
    );
  }
  endAssignment(data: any): Observable<any> {
    let date = new Date();
    return this.http.patch('http://localhost:8080/endAssignment/',
    { "user_id": data.user_id, "project_id": data.project_id, "hourly_rate": data.hourly_rate,
      "start_date": data.start_date, "end_date": date, "enabled": false},
      {responseType: 'json'}
    );
  }
  restartAssignment(data: any): Observable<any> {
      let date = new Date();
      return this.http.patch('http://localhost:8080/endAssignment/',
      { "user_id": data.user_id, "project_id": data.project_id, "hourly_rate": data.hourly_rate,
        "start_date": data.start_date, "enabled": true},
        {responseType: 'json'}
      );
    }
  getAssignment(user_id: number, project_id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/getAssignment/${user_id}/${project_id}`);
  }
  getAssignmentsByUser(data: any): Observable<any> {
    return this.http.get(`http://localhost:8080/getAssignmentsByUser/${data}`);
  }
  getDisabledAssignmentsByUser(data: any): Observable<any> {
    return this.http.get(`http://localhost:8080/getDisabledAssignmentsByUser/${data}`);
  }
}
