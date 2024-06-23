import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) {}

    getCategoryAll(): Observable<Category[]> {
      return this._http.get<Category[]>('https://localhost:7229/Category')
    }
    getCategoryById(id: number): Observable <Category> {
      return this._http.get<Category>(`https://localhost:7229/Category/id?id=${id}`)
    }
}
