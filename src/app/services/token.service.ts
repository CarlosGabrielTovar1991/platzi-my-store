import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    const token = localStorage.getItem('access_token');
    return token;
  }
}
