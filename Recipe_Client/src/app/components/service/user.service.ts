import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  login(name: string, password: string) {
    return this._http.post('https://localhost:7229/user/Login', { name, password });
  }
  register(user: User) {
    return this._http.post('https://localhost:7229/user/Register', user);
  }
  getUserById(id: number): Observable<User> {
    return this._http.get<User>(`https://localhost:7229/user/id?id=${id}`)
  }
}
