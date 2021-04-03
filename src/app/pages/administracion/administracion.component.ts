import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EnterpriseService }      from '../../services/enterprise.service';
import { ReciclerBynTypeService } from '../../services/recicler.byn.type.service';
import { FillLevelService }       from '../../services/fill.level.service';
import { ReciclerBynService }     from '../../services/recicler.byn.service';
import { SensorService }          from '../../services/sensor.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.sass']
})
export class AdministracionComponent implements OnInit {

  public menuItems:any = [
    { cod: 'empresas',        label: 'Administrar Empresas',              active:true },
    { cod: 'contenedores',    label: 'Administrar Contenedores',          active:false },
    { cod: 'tipo-cont',       label: 'Administrar Tipo de Contenedores',  active:false },
    { cod: 'sensores',        label: 'Administrar Sensores',              active:false },
    { cod: 'ubicaciones',     label: 'Administrar Ubicaciones',           active:false },
    { cod: 'nivelLlenado',    label: 'Nivel de Llenado',                  active:false },
    { cod: 'users',           label: 'Usuarios',                          active:false },
  ];

  constructor(
    private enterpriseService:      EnterpriseService,
    private reciclerBynTypeService: ReciclerBynTypeService,
    private reciclerBynService:     ReciclerBynService,
    private fillLevelService:       FillLevelService,
    private sensorService:          SensorService,
    private route:                  ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if ( params.hasOwnProperty( 'subPage' ) ){
        this.showMenuItem( this.getMenuItemFCod( params.subPage ) );
      }
    });
  }

  getMenuItemFCod( cod:string ){
    for (let c = 0; c < this.menuItems.length; c++){
      if ( this.menuItems[ c ].cod == cod ){
        return this.menuItems[ c ];
      }
    }
    return null;
  }

  showMenuItem( i:any ){
    this.resetStatusItems();

    i.active = true;
  }

  resetStatusItems(){
    for (let c=0; c < this.menuItems.length; c++ ){
      this.menuItems[ c ].active = false;
    }
  }

  isItemActive( cod:string ){
    for (let c=0; c < this.menuItems.length; c++ ){
      if ( this.menuItems[ c ].cod == cod && this.menuItems[ c ].active ){
        return true;
      }
    }

    return false;
  }

  ngOnDestroy(){
  }

}
