import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent {

  img: string = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Input() alt:string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = './assets/images/placeholder.jpg'

  constructor() { }

  // ngOnChanges(changes: SimpleChanges) {
  // }

  imgLoaded() {
    this.loaded.emit(this.img);
  }

  imgError() {
    this.img = this.imageDefault;
  }
}
