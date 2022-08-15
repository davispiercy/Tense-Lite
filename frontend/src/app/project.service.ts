import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './models/project.model';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/enabledProjects`);
  }
  getDisabledProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/disabledProjects`);
  }
  getUserProjects(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProjects/${data}`);
  }
  getProjectId(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getProjectId/${name}`);
  }

  addProject(data: any): Observable<any>{
    return this.http.post<Project>(
      `${this.baseUrl}/createProject/`,
      { "name": data.name, "start_date": data.start_date, "end_date": data.end_date, "billable": data.billable },
      {responseType: 'json'}
    );
  }
  addP(name: String, s_date: Date, e_date: Date, billable: boolean): Observable<any> {
    return this.http.post<Project>(
      `${this.baseUrl}/createProject/`,
      { "name": name, "start_date": s_date, "end_date": e_date, "billable": billable },
      { responseType: 'json'}
    );
  }
  disableProject(data: any): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/updateProject/`,
      { "id": data.id, "name": data.name, "start_date": data.start_date, "end_date": data.end_date,
      "billable": data.billable, "enabled": false},
      {responseType: 'json'}
    );
  }
  enableProject(data: any): Observable<any> {

      return this.http.patch(
        `${this.baseUrl}/updateProject/`,
        { "id": data.id, "name": data.name, "start_date": data.start_date, "end_date": data.end_date,
        "billable": data.billable, "enabled": true},
        {responseType: 'json'}
      );
    }
  getProjectName(data: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/getProjectName/${data}`,
    {responseType: 'text'});
  }
  editProject(id: number, data: any): Observable<any>{
    let start = new Date(data.start_date);
    let end = new Date(data.end_date);
    return this.http.patch(`${this.baseUrl}/updateProject`,
      { "id": id, "name": data.name, "start_date": start, "end_date": end,
      "billable": data.billable, "enabled": data.enabled},
      {responseType: 'json'}
    );
  }
}
