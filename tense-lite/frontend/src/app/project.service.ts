import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './models/project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }
  getProjects(): Observable<any> {
    return this.http.get('http://localhost:8080/enabledProjects');
  }
  getProjectIds(data: any): Observable<any> {
    return this.http.get(`http://localhost:8080/getProjectIds/${data}`);
  }
  getUserProjects(data: any): Observable<any> {
    return this.http.get(`http://localhost:8080/getProjects/${data}`);
  }

  addProject(data: any): Observable<any>{
    return this.http.post<Project>(
      'http://localhost:8080/createProject/',
      { "name": data.name, "start_date": data.start_date, "end_date": data.end_date, "billable": data.billable },
      {responseType: 'json'}
    );
  }
  disableProject(data: any): Observable<any> {
    return this.http.patch(
      `http://localhost:8080/updateProject/`,
      { "id": data.id, "name": data.name, "start_date": data.start_date, "end_date": data.end_date,
      "billable": data.billable, "enabled": false},
      {responseType: 'json'}
    );
  }
  getProjectName(data: any): Observable<any>{
    return this.http.get(`http://localhost:8080/getProjectName/${data}`);
  }
}
