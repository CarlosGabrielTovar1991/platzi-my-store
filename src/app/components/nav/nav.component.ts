import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from 'src/app/services/auth.service';

import { Product } from '../../models/product.model';
import { User } from 'src/app/models/user.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu: boolean = false;
  counter: number = 0;
  profile?: User;
  isLoggingIn: boolean = false;

  constructor(
    private authService:AuthService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products: Product[]) => {
      this.counter = products.length;
    });
  }

  toggleMenu(): void {
    this.activeMenu = !this.activeMenu
  }

  login() {
    this.isLoggingIn = true;
    this.authService.login("gabriel@email.com", "pippo123")
    .pipe(
      finalize(() => { this.isLoggingIn = false; })
    )
    .subscribe({
      next: (response) => { this.profile = response; },

    });
  }

  getProfile() {
    this.authService.profile()
    .subscribe(response => {
      this.profile = response;
    });
  }

}
