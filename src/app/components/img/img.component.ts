import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent implements OnInit, OnChanges {

  img: string = '';
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // Código a ejecutar adicional solo cuando cambia img
    console.log('Ha cambiado img');
  }
  @Input() alt:string = '';

  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = './assets/images/placeholder.jpg'

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  imgLoaded() {
    console.log("HIJO: Imagen cargada con éxito.");
    this.loaded.emit(this.img);
  }

  imgError() {
    this.img = this.imageDefault;
  }
}
