import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private API_URL = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    return this.http.get<Product[]>(this.API_URL);
  }

  get (id: string) {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  create (data: CreateProductDTO) {
    return this.http.post<Product>(`${this.API_URL}`, data);
  }
}


