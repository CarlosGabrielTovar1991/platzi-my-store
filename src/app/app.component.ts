import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  altParent = '';

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

  onLoaded(img: string) {
    console.log("PADRE: Imagen cargada con éxito.", img)
  };
}




