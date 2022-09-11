import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, UpdateProductDTO, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private API_URL = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient,
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && limit >= 0 && offset !== undefined && offset >= 0) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.API_URL, {params});
  }

  // getByPage(limit: number, offset: number) {
  //   return this.http.get<Product[]>(`${this.API_URL}`, {
  //     params: {limit, offset}
  //   });
  // }

  get (id: string) {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  create (data: CreateProductDTO) {
    return this.http.post<Product>(`${this.API_URL}`, data);
  }

  update( id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.API_URL}/${id}`, data);
  }

  delete (id: string) {
    return this.http.delete<boolean>(`${this.API_URL}/${id}`);
  }
}


