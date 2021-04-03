import { Component, OnInit, Input } from '@angular/core';

import { DashboardFinderConfigModel } from './dashboard-finder.config.model';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired, BootstrapFormNumber, BootstrapFormDate } from '../bootstrap-form/bootstrap-form-validators';
import { DashboardFinderParams } from './models/dashboard.finder.params';

import { FormateoService }        from '../../services/formateo.service';
import { ReciclerBynTypeService } from '../../services/recicler.byn.type.service';
import { AppUIUtilsService }      from '../../services/app.ui.utils.service';

@Component({
  selector: 'app-dashboard-finder',
  templateUrl: './dashboard-finder.component.html',
  styleUrls: ['./dashboard-finder.component.sass']
})
export class DashboardFinderComponent implements OnInit {

  @Input() filterListConfig:DashboardFinderConfigModel = new DashboardFinderConfigModel();
  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();

  private applyFilters:any = null;
  private applyFiltersClick:any = null;

  constructor(
    private formateoService:        FormateoService,
    private reciclerBynTypeService: ReciclerBynTypeService,
    private appUIUtilsService:      AppUIUtilsService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(){
    this.formConfig.clearFields();
    this.formConfig.setTitle( '' );
    this.formConfig.model = this.filterListConfig.model;
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Tipo de Contenedor:', field: 'byn_type', type: 'select', validator: new BootstrapFormRequired(),
        originDataSubject:this.reciclerBynTypeService.getAllOK, provider: this.reciclerBynTypeService, getDataFunction:'getAllTypeBynData'
      } ) );
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Id Localización:', field: 'location_id', type: 'number',
        validator: new BootstrapFormNumber({ min:0, max:1000000 })
      } ) );
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Fecha Inicial:', field: 'date_start', type: 'date',
        validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } ),
        formatFunction:  ( i:any ) => { return this.formateoService.getTimeStampFDateStr(i); }
      } ) );
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Fecha Final:', field: 'date_end', type: 'date',
        validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } ),
        formatFunction:  ( i:any ) => { return this.formateoService.getTimeStampFDateStr(i); }
      } ) );

    this.applyFilters = new ButtonBootstrapFormConfig( { title:'Buscar', type: 'button' } );
    this.formConfig.AddElement( this.applyFilters );

    if (this.applyFiltersClick !== null){ this.applyFiltersClick.unsubscribe(); }
    this.applyFiltersClick = this.applyFilters.onClick.subscribe({  next: ( params: any ) => {
      this.appUIUtilsService.showMessage( 'Función de filtrado aún no implementada' );
    } });

    this.formConfig.setFormLayount('in-line');
  }

  ngOnDestroy(){
    if (this.applyFiltersClick !== null){ this.applyFiltersClick.unsubscribe(); }
  }

}
