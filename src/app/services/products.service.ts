import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, UpdateProductDTO, Product } from '../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';

import { catchError, retry, throwError, map } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private API_URL = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient,
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && limit >= 0 && offset !== undefined && offset >= 0) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.API_URL, {
      params,
      context: checkTime()
    })
    .pipe(
      retry(1),
      map(products => products.map(currentProduct => {
        return {
          ...currentProduct,
          taxes: .19 * currentProduct.price
        }
      }))
    );
  }

  // getByPage(limit: number, offset: number) {
  //   return this.http.get<Product[]>(`${this.API_URL}`, {
  //     params: {limit, offset}
  //   });
  // }

  get (id: string) {
    return this.http.get<Product>(`${this.API_URL}/${id}`)
    .pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.InternalServerError) {
        return throwError(() => ("Ups! Error del server."))
      }
      if (error.status === HttpStatusCode.NotFound) {
        return throwError(() => ("Ups! Nada se encontró."))
      }
      if (error.status === HttpStatusCode.Unauthorized) {
        return throwError(() => ("Ups! No tienes permisos."))
      }
      return throwError(() => ("Ups! Hay un problema."))
    }));
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


