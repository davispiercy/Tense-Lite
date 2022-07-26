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
  getDisabledProjects(): Observable<any> {
    return this.http.get('http://localhost:8080/disabledProjects');
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
  enableProject(data: any): Observable<any> {

      return this.http.patch(
        `http://localhost:8080/updateProject/`,
        { "id": data.id, "name": data.name, "start_date": data.start_date, "end_date": data.end_date,
        "billable": data.billable, "enabled": true},
        {responseType: 'json'}
      );
    }
  getProjectName(data: any): Observable<any>{
    return this.http.get(`http://localhost:8080/getProjectName/${data}`);
  }
  editProject(id: number, data: any): Observable<any>{
    //console.log(data.enabled);
   /*return this.http.patch(
      `http://localhost:8080/updateProject/`,
    { "id": id, "name": data.name, "start_date": data.start_date, "end_date": data.end_date,
    "billable": data.billable, "enabled": true},
    {responseType: 'json'}
    );*/
          console.log(data.start_date);
          console.log(data.end_date);
    let start = new Date(data.start_date);
    let end = new Date(data.end_date);
    return this.http.patch(`http://localhost:8080/updateProject`,
      { "id": id, "name": data.name, "start_date": start, "end_date": end,
      "billable": data.billable, "enabled": true},
      {responseType: 'json'}
    );
  }
}
