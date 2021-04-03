import { Component, OnInit } from '@angular/core';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired, BootstrapFormNumber }                               from '../../../components/bootstrap-form/bootstrap-form-validators';

import { AppUIUtilsService }         from '../../../services/app.ui.utils.service';
import { SensorService }             from '../../../services/sensor.service';
import { ReciclerBynService }        from '../../../services/recicler.byn.service';

import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';

import { Sensor }  from '../../../models/sensor';

@Component({
  selector: 'app-sensors-abm',
  templateUrl: './sensors-abm.component.html',
  styleUrls: ['./sensors-abm.component.sass']
})
export class SensorsAbmComponent implements OnInit {

  public showForm:boolean = false;
  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();

  public tableConfig:ConfigTableModel = new ConfigTableModel();

  private goToCreate:any = null;
  private goToEdit:any   = null;

  private saveBtnEvnt:any = null;
  private backBtnEvnt:any = null;
  private updateKeyBtnEvnt:any = null;
  private backBtn:any = null;
  private saveBtn:any = null;
  private updateKeyBtn:any = null;
  private updateKey:boolean = false;

  private goToSensorSubj:any = null;
  private formIsValidated:any = null;
  private contextChanged:any = null;

  private getItem:any = null;
  private PutOK:any   = null;
  private PostOK:any  = null;

  private field_ak:any = null;
  private key_place_older:string = '**************';

  constructor(
    private sensorService:      SensorService,
    private generalService:     AppUIUtilsService,
    private reciclerBynService: ReciclerBynService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(){
    this.tableConfig.id       = 'sensors';
    this.tableConfig.itemName = 'Sensor';
    this.tableConfig.textNew  = 'Nuevo';

    this.tableConfig.clearFieldsOptions();
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'byn_id',  text:'Contenedor' } ),
      { comp: [ '=' ], controlConfig: { label: 'Contenedor', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'probe_interval',  text:'Intervalo de medición' } ),
      { comp: [ '=' ], controlConfig: { label: 'Intervalo de medición', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'description',  text:'Descripción' } ),
      { comp: [ '=' ], controlConfig: { label: 'Descripción', type:'string' } } );

    this.tableConfig.updateTableSubject = this.sensorService.updateTableSubject;
    this.tableConfig.provider           = this.sensorService;
    this.tableConfig.getAllMethodName   = 'getAllSensorsData';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;

    if ( this.goToCreate !== null ){
        this.goToCreate.unsubscribe();
    }
    this.goToCreate = this.sensorService.goToCreateSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Nuevo Sensor' );
        this.formConfig.model = new Sensor();

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
        this.formConfig.setContext( 'create' );
        this.field_ak.setType( 'text' );
    } });

    if ( this.goToEdit !== null ){
        this.goToEdit.unsubscribe();
    }
    this.goToEdit = this.sensorService.goToEditSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Editar Sensor' );
        this.generalService.presentLoading();
        this.sensorService.get( params );

        if ( this.getItem !== null ){
          this.getItem.unsubscribe();
        }
        this.getItem = this.sensorService.getOK.subscribe({  next: ( params: any ) => {
            this.generalService.dismissLoading();
            this.formConfig.model = params;
            this.field_ak.setType( 'password' );
            this.formConfig.model.auth_key = this.key_place_older;
        } });

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
        this.formConfig.setContext( 'edit' );
    } });

    this.showForm = false;

    if ( this.contextChanged === null){
      this.contextChanged = this.formConfig.contextChanged.subscribe({  next: ( params: any ) => {
          switch ( params.context ){
            case 'create':
              this.field_ak.setDisabled( false );
            break;

            case 'edit':
              this.field_ak.setDisabled( true );
            break;
          }
      } });
    }
  }

  setFormFields( fCOnfig:BootstrapFormConfig ){
    fCOnfig.clearFields();
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Contenedor:', field: 'byn_id', type: 'select', validator: new BootstrapFormRequired(),
        originDataSubject:this.reciclerBynService.getAllOK, provider: this.reciclerBynService, getDataFunction:'getRecicleyBynData'} ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Intervalo de medición:', field: 'probe_interval', type: 'number', validator: new BootstrapFormRequired({ extraValidator:new BootstrapFormNumber({ min:0, max:10000 }) }) } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Descripción:', field: 'description', type: 'text', validator: new BootstrapFormRequired() } ) );

    this.field_ak =  new FieldBootstrapFormConfig(
      { title:'Key:', field: 'auth_key', type: 'text', validator: new BootstrapFormRequired( { enabledInContexts:['create'] } ) } );
    fCOnfig.AddElement( this.field_ak );

    this.updateKeyBtn = new ButtonBootstrapFormConfig( { title:'Modificar Key', type: 'button', visibleOnlyInContexts:['edit'] } );
    fCOnfig.AddElement( this.updateKeyBtn );
    if (this.updateKeyBtnEvnt !== null){ this.updateKeyBtnEvnt.unsubscribe(); }
    this.updateKeyBtnEvnt = this.updateKeyBtn.onClick.subscribe({  next: ( params: any ) => {
        this.updateKey = !this.updateKey;
        this.field_ak.setDisabled( !this.updateKey );
        if ( this.updateKey ){
          this.field_ak.setType( 'text' );
          this.formConfig.model.auth_key = '';
          this.field_ak.validator.enabledInContexts = [];
        } else {
          this.field_ak.setType( 'password' );
          this.formConfig.model.auth_key = this.key_place_older;
          this.field_ak.validator.enabledInContexts = ['create'];
        }
    } });

    fCOnfig.repeatBtnInTop = false;
    fCOnfig.loadData.next(true);
  }

  setFormButtons( fCOnfig:BootstrapFormConfig ){
    this.formConfig.clearButtons();

    this.backBtn = fCOnfig.addButton( new ButtonBootstrapFormConfig( { title:'Volver' } ) );
    this.saveBtn = fCOnfig.addButton( new ButtonBootstrapFormConfig( { title:'Guardar' } ) );

    if ( this.saveBtnEvnt !== null) { this.saveBtnEvnt.unsubscribe(); }
    this.saveBtnEvnt = this.saveBtn.onClick.subscribe({  next: ( params: any ) => {
        fCOnfig.validateForm.next();
    } });

    if ( this.backBtnEvnt !== null){ this.backBtnEvnt.unsubscribe();  }
    this.backBtnEvnt = this.backBtn.onClick.subscribe({  next: ( params: any ) => {
        this.sensorService.goToSensorsAbm();
    } });

    if ( this.goToSensorSubj !== null) { this.goToSensorSubj.unsubscribe(); }
    this.goToSensorSubj = this.sensorService.goToSensorSubj.subscribe({  next: ( params: any ) => {
        this.setConfig();
    } });

    if ( this.formIsValidated !== null ){ this.formIsValidated.unsubscribe(); }
    this.formIsValidated = fCOnfig.isValidated.subscribe({  next: ( params: any ) => {
        if ( params.success == true ){
          if ( fCOnfig.getContext() == 'edit'){
            this.dataPutAndSubscribeResponse( fCOnfig.model );
          } else {
            this.dataPostAndSubscribeResponse( fCOnfig.model );
          }

        } else {
          this.generalService.showMessage( this.generalService.getMessageFErrors( params.errors ) );
        }
    } });

  }

  dataPutAndSubscribeResponse( model:Sensor ){
    if ( this.PutOK !== null ){
      this.PutOK.unsubscribe();
    }

    this.PutOK = this.sensorService.PutOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.sensorService.goToSensorsAbm();
    } });

    this.generalService.presentLoading();

    //Se verifica si no se debe editar la key se quita el campo
    if ( !this.updateKey ){
      delete model.auth_key;
    }
    this.sensorService.put( model );

  }

  dataPostAndSubscribeResponse( model:Sensor ){
    if ( this.PostOK !== null ){
      this.PostOK.unsubscribe();
    }

    this.PostOK = this.sensorService.PostOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.sensorService.goToSensorsAbm();
    } });

    this.generalService.presentLoading();
    this.sensorService.post( model );
  }

  ngOnDestroy(){
    this.goToCreate.unsubscribe();
    this.goToEdit.unsubscribe();
    if (this.saveBtnEvnt !== null){
      this.saveBtnEvnt.unsubscribe();
    }
    if ( this.backBtnEvnt !== null ){
      this.backBtnEvnt.unsubscribe();
    }
    if ( this.goToSensorSubj !== null ){
      this.goToSensorSubj.unsubscribe();
    }
    if ( this.formIsValidated !== null ){
      this.formIsValidated.unsubscribe();
    }
    if ( this.getItem !== null ){
      this.getItem.unsubscribe();
    }
    if ( this.PutOK !== null ){
      this.PutOK.unsubscribe();
    }
    if ( this.PostOK !== null ){
      this.PostOK.unsubscribe();
    }
    if ( this.updateKeyBtnEvnt !== null ){
      this.updateKeyBtnEvnt.unsubscribe();
    }
    if ( this.contextChanged !== null){
      this.contextChanged.unsubscribe();
    }
  }

}
