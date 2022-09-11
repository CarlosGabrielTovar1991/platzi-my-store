import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

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
  productTemplate: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: { id: 0, name:''},
  };

  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore()
    // this.productsService.getByPage(10, 0)
    // .subscribe(data => this.products = data);
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  loadMore() {
    this.productsService.getAll(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
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

  editCurrentProduct() {
    const currentProductId = this.productChosen.id;
    const productUpdate: UpdateProductDTO = {
      title: 'FANTASTIC FLUFFY KITTY',
      price: 500,
    }
    this.productsService.update(currentProductId ,productUpdate)
    .subscribe(response => {
      const productId = this.products.findIndex(item => item.id === currentProductId);
      if (productId !== -1) {
        this.products[productId] = response;
        this.productChosen = response;
      }
    });
  }

  deleteCurrentProduct() {
    const currentProductId = this.productChosen.id;
    this.productsService.delete(currentProductId)
    .subscribe(() => {
      const productId = this.products.findIndex(item => item.id === currentProductId);
      if (productId !== -1) {
        this.products.splice(productId, 1);
        this.productChosen = { ...this.productTemplate };
        this.showProductDetail = false;
      }
    });
  }
}
