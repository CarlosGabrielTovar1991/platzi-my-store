import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  productId?: string | null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
    switchMap(params => {
      this.productId = params.get('id');
      if (this.productId) {
        return this.productsService.get(this.productId);
      }
      return [];
    }))
    .subscribe(data => {
      this.product = data;
    });
  }

  goBack() {
    this.location.back();
  }
}
