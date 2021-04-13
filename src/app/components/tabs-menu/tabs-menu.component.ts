import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { ReciclerBynService } from '../../services/recicler.byn.service';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.sass']
})
export class TabsMenuComponent implements OnInit {

  private dashboardParams:any = {};

  public enlaces = [
    { title: 'Dashboard',      active:true,  onClick: ()=> { this.reciclerBynService.goToDashboar( this.dashboardParams );  } },
    { title: 'Monitoreo',      active:false, route:'/monitoreo' },
    { title: 'Administración', active:false, route:'/administracion' }
  ];

  constructor(
    public  router:             Router,
    private reciclerBynService: ReciclerBynService
  ) { }

  ngOnInit(): void {
  }

  menuClick( enlace:any ){
    if ( enlace.hasOwnProperty( 'route' ) ){
      this.router.navigate( [ enlace.route ] );
    }

    if ( enlace.hasOwnProperty( 'onClick' )){
      enlace.onClick();
    }

    for ( let c=0; c<this.enlaces.length; c++ ){
      this.enlaces[ c ].active = false;
    }
    enlace.active = true;
  }

}
