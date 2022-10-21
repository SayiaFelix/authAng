import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGService {
  LoginForm: any;

  constructor() { }
  IsLoogedIn(){
    return localStorage.getItem(this.LoginForm.value)!=null;

  }
}
