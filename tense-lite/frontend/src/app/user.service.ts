import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  checkIfExists(uid: string) : Observable<any> {
    return this.http.get(`http://localhost:8080/userExists/${uid}`)
  }
  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/enabledUsers');
    //return this.http.get('http://localhost:8080/users');
  }
  getDisabledUsers(): Observable<any> {
    //return this.http.get('http://localhost:8080/enabledUsers');
    return this.http.get('http://localhost:8080/disabledUsers');
  }
  getUserByEmail(email: string) : Observable<any> {
    return this.http.get(`http://localhost:8080/userByEmail/${email}`)
  }
  getUserById(uid: string) : Observable<any> {
    return this.http.get(`http://localhost:8080/userById/${uid}`)
  }
  getUserId(uid: string) : Observable<any> {
    return this.http.get(`http://localhost:8080/findUserId/${uid}`)
  }
  getRole(uid: string) : Observable<any> {
    return this.http.get(`http://localhost:8080/getRole/${uid}`,{responseType: 'text'})
  }

  addUser(data: any): Observable<any>{
    /*return this.http.post<User>(
    'http://localhost:8080/createUser/',
    { "uid": data.uid, "first_name": data.first_name, "last_name": data.last_name, "email": data.email},
    {responseType: 'json'}
    );*/
    console.log(data);
    return this.http.post<User>(
        'http://localhost:8080/createUser/',
        { "uid": data.uid, "email": data.email},
        {responseType: 'json'}
        );
  }
  signUpUser(uid: string): Observable<any> {
    return this.http.post<User>(
      'http://localhost:8080/createUser/',
      { "uid": uid}
    );
  }
  disableUser(data: any): Observable<any> {
    return this.http.patch(
      `http://localhost:8080/updateUser/`,
      { "id": data.id, "uid": data.uid, "first_name": data.first_name, "last_name": data.last_name,
      "email": data.email, "sec_group": data.sec_group, "enabled": false},
      {responseType: 'json'}
    );
  }
  enableUser(data: any): Observable<any> {
      return this.http.patch(
        `http://localhost:8080/updateUser/`,
        { "id": data.id, "uid": data.uid, "first_name": data.first_name, "last_name": data.last_name,
        "email": data.email, "sec_group": data.sec_group, "enabled": true},
        {responseType: 'json'}
      );
  }
  makeAdmin(data: any): Observable<any> {
    return this.http.patch(
      `http://localhost:8080/updateUser/`,
      { "id": data.id, "uid": data.uid, "first_name": data.first_name, "last_name": data.last_name,
      "email": data.email, "sec_group": 'admin', "enabled": data.enabled},
      {responseType: 'json'}
    )
  }
  removeAdmin(data: any): Observable<any> {
      return this.http.patch(
        `http://localhost:8080/updateUser/`,
        { "id": data.id, "uid": data.uid, "first_name": data.first_name, "last_name": data.last_name,
        "email": data.email, "sec_group": 'basic', "enabled": data.enabled},
        {responseType: 'json'}
      )
  }
  editUser(id: number, uid: string, data: any): Observable<any>{
    console.log(data.enabled);
    return this.http.patch('http://localhost:8080/updateUser',
    { "id": id, "uid": uid, "first_name": data.first_name, "last_name": data.last_name, "email": data.email,
    "sec_group": data.sec_group, "enabled": data.enabled},
    {responseType: "json"}
    );
  }
}
