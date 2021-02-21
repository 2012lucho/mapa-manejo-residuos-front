import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router }                  from '@angular/router';

import { Login }  from '../../models/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private  router:      Router,
    private  http:        HttpClient,
  ) {

  }

  login( model:Login ){

  }

  toLoginIfNL(){

  }

  toLogOut(){

  }

  logedIn(){
    return true;
  }

  getToken(){

  }

  getUserName(){

  }

  getRole(){

  }

  setMenuLinks(){

  }
}
