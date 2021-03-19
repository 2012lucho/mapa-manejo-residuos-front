import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public logedInName:string = '';

  public userMenuOptions:any = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.logedInName = this.authService.getUserName();
    this.userMenuOptions.push( { label: 'Cerrar sesión', onClick:()=>{ this.authService.toLogOut() } } );
  }

  menuClick( option:any ){
    option.onClick();
  }

}
