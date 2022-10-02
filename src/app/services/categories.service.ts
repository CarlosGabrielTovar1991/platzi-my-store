import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && limit >= 0 && offset !== undefined && offset >= 0) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Category[]>(`${this.API_URL}/categories`, {
      params
    });
  }
}
