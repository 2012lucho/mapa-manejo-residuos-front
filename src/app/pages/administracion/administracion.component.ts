import { Component, OnInit } from '@angular/core';

import { EnterpriseService }      from '../../services/enterprise.service';
import { ReciclerBynTypeService } from '../../services/recicler.byn.type.service';
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
    { cod: 'recicler-byn',    label: 'Administrar Contenedores',          active:false },
    { cod: 'tipo-cont',       label: 'Administrar Tipo de Contenedores',  active:false },
    { cod: 'sensors',         label: 'Administrar Sensores',              active:false },
    { cod: 'ubicaciones',     label: 'Administrar Ubicaciones',           active:false },
    { cod: 'cont-fill-level', label: 'Actualizar Estado',                 active:false },
    { cod: 'users',           label: 'Usuarios',                          active:false },
  ];

  private goToEnterpriseSubj:any = null;
  private goToReciclerBynTypeSubj:any = null;
  private goToReciclerBynSubj:any = false;
  private goToAbmFillLevelSubj:any = null;
  private goToSensorSubj:any = null;

  constructor(
    private enterpriseService:      EnterpriseService,
    private reciclerBynTypeService: ReciclerBynTypeService,
    private reciclerBynService:     ReciclerBynService,
    private sensorService:          SensorService
  ) { }

  ngOnInit(): void {
    this.goToEnterpriseSubj = this.enterpriseService.goToEnterpriseSubj.subscribe({  next: ( params: any ) => {
      this.showMenuItem( this.getMenuItemFCod( 'empresas' ) );
    } });

    this.goToReciclerBynTypeSubj = this.reciclerBynTypeService.goToReciclerBynTypeSubj.subscribe({  next: ( params: any ) => {
      this.showMenuItem( this.getMenuItemFCod( 'tipo-cont' ) );
    } });

    this.goToReciclerBynSubj = this.reciclerBynService.goToAbmSubj.subscribe({  next: ( params: any ) => {
      this.showMenuItem( this.getMenuItemFCod( 'recicler-byn' ) );
    } });

    this.goToAbmFillLevelSubj = this.reciclerBynService.goToAbmFillLevelSubj.subscribe({  next: ( params: any ) => {
      this.showMenuItem( this.getMenuItemFCod( 'cont-fill-level' ) );
    } });

    this.goToSensorSubj = this.sensorService.goToSensorSubj.subscribe({  next: ( params: any ) => {
      this.showMenuItem( this.getMenuItemFCod( 'sensors' ) );
    } });
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
    this.goToEnterpriseSubj.unsubscribe();
    this.goToReciclerBynTypeSubj.unsubscribe();
    this.goToReciclerBynSubj.unsubscribe();
    this.goToAbmFillLevelSubj.unsubscribe();
    this.goToSensorSubj.unsubscribe();
  }

}
