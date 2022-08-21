import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent implements OnInit {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = './assets/img/placeholder.jpg';

  constructor() { }

  ngOnInit(): void {}

  imgLoaded() {
    console.log("HIJO: Imagen cargada con éxito.")
    this.loaded.emit(this.img);
  }

  imgError() {
    this.img = this.imageDefault;
  }
}


