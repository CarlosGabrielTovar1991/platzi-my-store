import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetails = new EventEmitter<string>();

  @Input() product!: Product;

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetails() {
    this.showDetails.emit(this.product.id);
  }

}
