import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  categoryId: string | null = null;
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService:ProductsService
  ) { }

  // Resolviendo un callback hell

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
    this.route.paramMap.pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        this.limit = 10;
        this.offset = 0;
        this.products = [];
        if (this.categoryId) {
          return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      })
    )
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     this.categoryId = params.get('id');
  //     this.onLoadMore();
  //   })
  // }

  onLoadMore() {
    if (this.categoryId) {
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
        .subscribe(data => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
    }
  }
}
