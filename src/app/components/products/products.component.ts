import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product } from '../../models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  myShoppingCart: Product[] = [];
  total: number = 0;
  showProductDetail: boolean = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: { id: 0, name:''},
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAll()
    .subscribe(data => this.products = data)
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetails(id: string) {
    this.productsService.get(id)
    .subscribe(data => {
      this.productChosen = data;
      this.showProductDetail = true;
    });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Maqueta de le 5 terre',
      description: 'Maqueta de esta maravillosa localidad italiana.',
      images: ['https://www.w3schools.com/css/img_5terre.jpg'],
      price: 231,
      categoryId: 2,
    };
    this.productsService.create(product)
    .subscribe(response => {
      this.products.unshift(response);
    });
  }
}







