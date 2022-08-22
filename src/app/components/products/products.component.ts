import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  products: Product[] = [
    {
      id: '1',
      name: 'Bicicleta',
      image: './assets/images/bike.jpeg',
      price: 100
    },
    {
      id: '2',
      name: 'Osito de peluche',
      image: './assets/images/teddy.jpeg',
      price: 30
    },
    {
      id: '3',
      name: 'Laptop',
      image: './assets/images/computer.jpeg',
      price: 500
    },
    {
      id: '4',
      name: 'Sobrero',
      image: './assets/images/hat.jpeg',
      price: 75
    },
    {
      id: '5',
      name: 'Minibar',
      image: './assets/images/minibar.jpeg',
      price: 125
    },
  ];

}
