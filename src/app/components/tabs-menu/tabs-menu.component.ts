import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.sass']
})
export class TabsMenuComponent implements OnInit {

  public enlaces = [
    { title: 'Dashboard',      active:true,  route:'/dashboard' },
    { title: 'Monitoreo',      active:false, route:'/monitoreo' },
    { title: 'Administración', active:false, route:'/administracion' }
  ];

  constructor(
    public  router: Router,
  ) { }

  ngOnInit(): void {
  }

  menuClick( enlace:any ){
    this.router.navigate( [ enlace.route ] );
  }

}
