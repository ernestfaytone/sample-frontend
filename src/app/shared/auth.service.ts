import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User interface
export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post('https://crud-ernest-app.herokuapp.com/api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('https://crud-ernest-app.herokuapp.com/api/auth/login', user);
  }

  // Get user list
  profileUser(): Observable<any> {
    return this.http.get('https://crud-ernest-app.herokuapp.com/api/auth/user-list');
  }

  // delete user
  delete(id: any): Observable<any> {
    return this.http.post<any>('https://crud-ernest-app.herokuapp.com/auth/delete', id);
  }

  // update user
  updateUser(rowData: any): Observable<any> {
    return this.http.post<any>('https://crud-ernest-app.herokuapp.com/api/auth/update', rowData);
  }
  
}

