import { Component, OnInit } from '@angular/core';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';
import { AppUIUtilsService }    from '../../../services/app.ui.utils.service';

import { ReciclerBynService } from '../../../services/recicler.byn.service';
import { BootstrapFormRequired, BootstrapFormNumber, BootstrapFormDate } from '../../../components/bootstrap-form/bootstrap-form-validators';

@Component({
  selector: 'app-fill-level',
  templateUrl: './fill-level.component.html',
  styleUrls: ['./fill-level.component.sass']
})
export class FillLevelComponent implements OnInit {
  public tableConfig:ConfigTableModel = new ConfigTableModel();

  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();
  public showForm:boolean = false;
  private formIsValidated:any = null;

  private goToCreate:any  = null;
  private saveBtnEvnt:any = null;
  private saveBtn:any     = null;
  private backBtn:any     = null;
  private backBtnEvnt:any = null;
  private goToAbmFillLevelSubj:any = null;

  constructor(
    private reciclerBynService: ReciclerBynService,
    private generalService:    AppUIUtilsService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(){
    //CONFIGURACIÓN DE TABLA
    this.tableConfig.id       = 'fillLevels';
    this.tableConfig.itemName = 'Registro';
    this.tableConfig.textNew  = 'Nuevo';

    this.tableConfig.clearFieldsOptions();
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'date',  text:'Fecha' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Fecha', type:'date' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'time',  text:'Hora' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Hora', type:'time' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'fillLevel',  text:'Nivel de llenado' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Nivel de llenado', type:'number' } } );

    this.tableConfig.updateTableSubject = this.reciclerBynService.updateTableSubject;
    this.tableConfig.provider           = this.reciclerBynService;
    this.tableConfig.getAllMethodName   = 'getRecicleyBynData';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;

    if ( this.goToCreate === null ){
        this.goToCreate = this.reciclerBynService.goToCreateSubj.subscribe({  next: ( params: any ) => {

        this.formConfig.setTitle( 'Actualizar estado de contenedor' );

        this.setFormConfig();
      } });
    }

    if (this.goToAbmFillLevelSubj === null){
      this.goToAbmFillLevelSubj = this.reciclerBynService.goToAbmFillLevelSubj.subscribe({  next: ( params: any ) => {
        this.setConfig();
      } });
    }

    this.showForm = false;

  }

  setFormConfig(){
    // CONFIGURACIÖN DE FORMULARIO
    this.formConfig.clearFields();
    this.formConfig.setTitle( 'Actualizar estado de contenedor' );
    this.formConfig.addField( new FieldBootstrapFormConfig(
      { title:'Contenedor:', field: 'byn_id', type: 'select', validator: new BootstrapFormRequired(), originDataSubject:this.reciclerBynService.getAllOK, provider: this.reciclerBynService,  getDataFunction:'getRecicleyBynData' } ) );
    this.formConfig.addField( new FieldBootstrapFormConfig(
      { title:'Fecha:', field: 'date', type: 'date', validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } ) } ) );
    this.formConfig.addField( new FieldBootstrapFormConfig(
      { title:'Hora:', field: 'time', type: 'time', validator: new BootstrapFormRequired() } ) );
    this.formConfig.addField( new FieldBootstrapFormConfig(
      { title:'Porcentaje de llenado:', field: 'fillLevel', type: 'number', validator: new BootstrapFormRequired( { extraValidator:new BootstrapFormNumber({ min:0, max:100 }) } ) } ));
    this.formConfig.repeatBtnInTop = false;

    this.formConfig.clearButtons();

    this.backBtn = this.formConfig.addButton( new ButtonBootstrapFormConfig( { title:'Volver' } ) );
    this.saveBtn = this.formConfig.addButton( new ButtonBootstrapFormConfig( { title:'Guardar' } ) );

    if ( this.saveBtnEvnt !== null ){
      this.saveBtnEvnt.unsubscribe();
    }
    this.saveBtnEvnt = this.saveBtn.onClick.subscribe({  next: ( params: any ) => {
      this.formConfig.validateForm.next();
    } });


    if ( this.backBtnEvnt !== null ){
      this.backBtnEvnt.unsubscribe();
    }
    this.backBtnEvnt = this.backBtn.onClick.subscribe({  next: ( params: any ) => {
      this.reciclerBynService.goToAbmFillLevel();
    } });

    this.formIsValidated = this.formConfig.isValidated.subscribe({  next: ( params: any ) => {
      console.log(params);
      if ( params.success == true ){
        this.generalService.showMessage('Función de guardado todavía no implementada');
      }
    } });

    this.showForm = true;
  }

  ngOnDestroy(){
    this.goToCreate.unsubscribe();
    if ( this.saveBtnEvnt !== null ){
      this.saveBtnEvnt.unsubscribe();
    }
    if ( this.backBtnEvnt !== null ){
      this.backBtnEvnt.unsubscribe();
    }
    if ( this.goToAbmFillLevelSubj !== null ){
      this.goToAbmFillLevelSubj.unsubscribe();
    }
    if ( this.formIsValidated !== null ){
      this.formIsValidated.unsubscribe();
    }
  }

}
