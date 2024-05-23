import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User, { UserResponse } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient) {}
  /*
  getAllUser(): Observable<UserResponse<User[]>> {
    return this.http.get<UserResponse<User[]>>(`${this.API}`);
  }
  */

  getUser(email: string, password: string): Observable<UserResponse<User>> {
    return this.http.post<UserResponse<User>>(`${this.API}/find`, {
      email,
      password,
    });
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.API}`, user);
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put(`${this.API}/${id}`, user);
  }

  deleteUser(id: string): Observable<UserResponse<any>> {
    return this.http.delete<UserResponse<any>>(`${this.API}/${id}`);
  }
}
