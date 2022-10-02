import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, zip } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Output() loadMore = new EventEmitter();

  // @Input() productId: string | null = null;
  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetails(id);
    }
  }

  @Input() products: Product[] = [];
  myShoppingCart: Product[] = [];
  total: number = 0;
  showProductDetail: boolean = false;
  productTemplate: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: { id: '0', name:''},
  };

  productChosen: Product = { ...this.productTemplate };

  statusDetails: 'init' | 'loading' | 'success' | 'error' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetails(id: string, wrong?: boolean) {
    this.statusDetails = 'loading';
    if (id && !this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productsService.get(wrong ? '1234567890' : id)
    .subscribe({
      next: (data) => {
        this.statusDetails = 'success';
        this.productChosen = data;
        this.showProductDetail = true;
      },
      error: (error: HttpErrorResponse) => {
        this.statusDetails = 'error';
        console.log(error); }
    });
  }

  readAndUpdate(id: string) {
    // Using switchMap

    // this.productsService.get(id)
    // .pipe(
    //   switchMap(
    //     (product) => this.productsService.update(product.id, {title: "Read and update Change"})
    //   ),
    //   switchMap(
    //     (product) => this.productsService.update(product.id, {title: "Another update Change"})
    //   )
    // );

    // Using zip

    zip(
      this.productsService.get(id),
      this.productsService.update(id, {title: "An update Change"})
    ).subscribe(response => {
      const readResponse = response[0];
      const updateResponse = response[1];
      console.log(readResponse);
      console.log(updateResponse);
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

  loadMoreClick() {
    this.loadMore.emit();
  }
}
