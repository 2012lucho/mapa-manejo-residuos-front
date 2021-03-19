import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Login }         from '../../models/login';

import { AuthService }     from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public login:Login = new Login();

  constructor(
    private auth:   AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.auth.logedIn());
    if ( this.auth.logedIn() ){
      this.router.navigate(['/']);
    }
  }

  next(){
    this.auth.login( this.login );
  }

}
