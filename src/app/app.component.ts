import { Component } from '@angular/core';
import { User } from './models/user.model';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imgParent = '';
  altParent = '';

  constructor(
    private usersService:UsersService,
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
}




