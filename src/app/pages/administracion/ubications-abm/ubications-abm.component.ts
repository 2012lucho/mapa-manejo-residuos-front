import { Component, OnInit } from '@angular/core';

import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';

import { UbicationsService } from '../../../services/ubications.service';

@Component({
  selector: 'app-ubications-abm',
  templateUrl: './ubications-abm.component.html',
  styleUrls: ['./ubications-abm.component.sass']
})
export class UbicationsAbmComponent implements OnInit {

  public tableConfig:ConfigTableModel = new ConfigTableModel();

  public goToCreate:any = null;
  public showUbicationForm:boolean = false;

  constructor(
    private ubicationsService: UbicationsService
  ) { }

  ngOnInit(): void {
    this.setConfig();

    this.goToCreate = this.ubicationsService.goToCreateSubj.subscribe({  next: ( params: any ) => {
      this.showUbicationForm = true;
    } });
  }

  setConfig(){
    this.tableConfig.id       = 'ubications';
    this.tableConfig.itemName = 'Ubicación';
    this.tableConfig.textNew  = 'Nueva';
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'lat', text:'Latitud'} ),
      { comp: [ '=' ], controlConfig: { label: 'Latitud', type:'string' }
      });
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'lng', text:'Longitud' } ),
      { comp: [ '=' ], controlConfig: { label: 'Longitud', type:'string' } }
    );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'addressStr', text:'Dirección' } ),
      { comp: [ '=' ], controlConfig: { label: 'Dirección', type:'string' } } );

    this.tableConfig.updateTableSubject = this.ubicationsService.updateTableSubject;
    this.tableConfig.provider           = this.ubicationsService;
    this.tableConfig.getAllMethodName   = 'getAll';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;
  }

  ngOnDestroy(){
    this.goToCreate.unsubscribe();
  }

}
