import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/enabledUsers');
  }
  addUser(data: any): Observable<any>{
    return this.http.post<User>(
    'http://localhost:8080/createUser/',
    { "first_name": data.first_name, "last_name": data.last_name, "email": data.email},
    {responseType: 'json'}
    );
  }
  disableUser(data: any): Observable<any> {
    return this.http.patch(
      `http://localhost:8080/updateUser/`,
      { "id": data.id, "first_name": data.first_name, "last_name": data.last_name, "email": data.email, "enabled": false},
      {responseType: 'json'}
    );
  }
}
