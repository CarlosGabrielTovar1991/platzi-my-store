import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  altParent = '';

  onLoaded(img: string) {
    console.log("PADRE: Imagen cargada con éxito.", img)
  };
}




