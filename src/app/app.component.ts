import { Component } from '@angular/core';
import { User } from './models/user.model';

import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  altParent = '';
  imgRta = '';

  constructor(
    private usersService:UsersService,
    private filesService: FilesService,
  ) {}

  onLoaded(img: string) {
    console.log("PADRE: Imagen cargada con éxito.", img)
  };

  createUser() {
    this.usersService.create(
      {
        name: 'Gabriel',
        email: 'gabriel@email.com',
        password: 'pippo123'
      }
    ).subscribe(response => {
      console.group("Create User");
      console.log(response);
      console.groupEnd();
    })
  }

  downloadPdf() {
    this.filesService.getFile(
      'MyLittlePdf',
      'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf'
    )
    .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element?.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta  => {
        this.imgRta = rta.location;
      })
    }
  }
}




