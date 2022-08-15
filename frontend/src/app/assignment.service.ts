import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
//import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createAssignment(user_id: number, project_id: number, hourly_rate: number): Observable<any> {
    let date = new Date();
    return this.http.post(
    `${this.baseUrl}/createAssignment/`,
    { "user_id": user_id, "project_id": project_id, "hourly_rate": hourly_rate,
    "start_date": date},
    {responseType: 'json'}
    );
  }
  endAssignment(data: any): Observable<any> {
    let date = new Date();
    return this.http.patch(`${this.baseUrl}/editAssignment/`,
    { "user_id": data.user_id, "project_id": data.project_id, "hourly_rate": data.hourly_rate,
      "start_date": data.start_date, "end_date": date, "enabled": false},
      {responseType: 'json'}
    );
  }
  editAssignment(user_id: number, project_id: number, start_date: Array<number>, data: any): Observable<any> {
    console.log(data);
    return this.http.patch(`${this.baseUrl}/editAssignment/`,
    { "user_id": user_id, "project_id": project_id, "hourly_rate": data.hourlyRate,
      "start_date": start_date },
      {responseType: 'json'}
    );
  }
  restartAssignment(data: any): Observable<any> {
      let date = new Date();
      return this.http.patch(`${this.baseUrl}/editAssignment/`,
      { "user_id": data.user_id, "project_id": data.project_id, "hourly_rate": data.hourly_rate,
        "start_date": data.start_date, "enabled": true},
        {responseType: 'json'}
      );
    }
  getAssignment(user_id: number, project_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAssignment/${user_id}/${project_id}`);
  }
  getAssignmentsByUser(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAssignmentsByUser/${data}`);
  }
  getDisabledAssignmentsByUser(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getDisabledAssignmentsByUser/${data}`);
  }
}
