import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event }  from '@angular/router';

import { ReciclerBynService } from '../../services/recicler.byn.service';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.sass']
})
export class TabsMenuComponent implements OnInit {

  private dashboardParams:any = {};

  public enlaces = [
    { title: 'Dashboard',      active:true,  route:'/', onClick: ()=> { this.reciclerBynService.goToDashboar( this.dashboardParams );  } },
    { title: 'Monitoreo',      active:false, route:'/monitoreo', onClick:()=>{} },
    { title: 'Administración', active:false, route:'/administracion', onClick:()=>{} }
  ];

  constructor(
    public  router:             Router,
    private reciclerBynService: ReciclerBynService
  ) {
    let subscription:any = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            this.setActive( event.url );
            subscription.unsubscribe();
        }
    });
  }

  ngOnInit(): void {

  }

  setActive( route:string ){
    route = route.split('/')[1];
    route = route.split(';')[0];
    for ( let c = 0; c < this.enlaces.length; c++ ){
      if ( this.enlaces[c].route == '/'+route ){
        this.enlaces[c].active = true;
      } else {
        this.enlaces[c].active = false;
      }
    }
  }

  menuClick( enlace:any ){
    enlace.onClick();

    if ( enlace.hasOwnProperty( 'route' ) ){
      this.router.navigate( [ enlace.route ] );
    }
  }

  ngOnDestroy(){
  }

}
