import { Component, OnInit, Input } from '@angular/core';

import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';
import { LocationFormConfig } from './ubications-form/location.form.config';

import { LocationsService } from '../../../services/locations.service';
import { AppUIUtilsService }    from '../../../services/app.ui.utils.service';

@Component({
  selector: 'app-ubications-abm',
  templateUrl: './ubications-abm.component.html',
  styleUrls: ['./ubications-abm.component.sass']
})
export class UbicationsAbmComponent implements OnInit {

  public tableConfig:ConfigTableModel = new ConfigTableModel();

  private goToCreate:any = null;
  private goToEdit:any = null;
  private goToLocationSubj:any = null;
  public showUbicationForm:boolean = false;

  public formConfig:LocationFormConfig = new LocationFormConfig();

  constructor(
    private locationsService:  LocationsService,
    private appUIUtilsService: AppUIUtilsService
  ) { }

  ngOnInit(): void {
    this.setConfig();

    this.goToCreate = this.locationsService.goToCreateSubj.subscribe({  next: ( params: any ) => {
      this.showUbicationForm    = true;
      this.formConfig.context   = 'create';
      this.formConfig.formTitle = 'Nueva Ubicación';
    } });
  }

  setConfig(){
    this.showUbicationForm = false;

    this.tableConfig.id       = 'ubications';
    this.tableConfig.itemName = 'Ubicación';
    this.tableConfig.textNew  = 'Nueva';
    this.tableConfig.clearFieldsOptions();
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'latitude', text:'Latitud'} ),
      { comp: [ '=' ], controlConfig: { label: 'Latitud', type:'string' }
      });
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'longitude', text:'Longitud' } ),
      { comp: [ '=' ], controlConfig: { label: 'Longitud', type:'string' } }
    );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'description', text:'Descripción' } ),
      { comp: [ '=' ], controlConfig: { label: 'Descripción', type:'string' } } );

    this.tableConfig.updateTableSubject = this.locationsService.updateTableSubject;
    this.tableConfig.provider           = this.locationsService;
    this.tableConfig.getAllMethodName   = 'getAll';
    this.tableConfig.expand             = '?&';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;

    if ( this.goToEdit !== null ){  this.goToEdit.unsubscribe(); }
    this.goToEdit = this.locationsService.goToEditSubj.subscribe({  next: ( params: any ) => {
        this.showUbicationForm = true;
        this.appUIUtilsService.presentLoading();
        this.locationsService.get( params );
        this.formConfig.context   = 'edit';
        this.formConfig.formTitle = 'Editar Ubicación';
    } });

    this.goToLocationSubj = this.locationsService.goToLocationSubj.subscribe({  next: ( params: any ) => {
      this.setConfig();
    } });
  }

  ngOnDestroy(){
    this.goToCreate.unsubscribe();
    this.goToEdit.unsubscribe();
    this.goToLocationSubj.unsubscribe();
  }

}
