import { Component, OnInit } from '@angular/core';

import { ReciclerBynTypeService } from '../../../services/recicler.byn.type.service';
import { LocationsService }       from '../../../services/locations.service';
import { ReciclerBynService }     from '../../../services/recicler.byn.service';
import { EnterpriseService }      from '../../../services/enterprise.service';
import { AppUIUtilsService }      from '../../../services/app.ui.utils.service';

import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired, BootstrapFormNumber } from '../../../components/bootstrap-form/bootstrap-form-validators';

import { Bin }    from '../../../models/bin';

@Component({
  selector: 'app-recicler-byn-abm',
  templateUrl: './recicler-byn-abm.component.html',
  styleUrls: ['./recicler-byn-abm.component.sass']
})
export class ReciclerBynAbmComponent implements OnInit {

  public tableConfig:ConfigTableModel = new ConfigTableModel();

  public showForm:boolean = false;
  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();
  private formIsValidated:any = null;

  private goToCreate:any  = null;
  private saveBtnEvnt:any = null;
  private saveBtn:any     = null;
  private backBtn:any     = null;
  private backBtnEvnt:any = null;
  private goToAbmSubj:any = null;

  private goToEdit:any = null;
  private getItem:any = null;

  private PutOK:any = null;

  private PostOK:any = null;

  constructor(
    private reciclerBynTypeService: ReciclerBynTypeService,
    private locationsService:  LocationsService,
    private reciclerBynService: ReciclerBynService,
    private enterpriseService:  EnterpriseService,
    private generalService:     AppUIUtilsService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(){
    this.tableConfig.id       = 'reciclerByns';
    this.tableConfig.itemName = 'Contenedor';
    this.tableConfig.textNew  = 'Nuevo';

    this.tableConfig.clearFieldsOptions();
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'description',  text:'Descripción' } ),
      { comp: [ '=' ], controlConfig: { label: 'Descripción', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'description',  text:'Ubicación', inExpand: 'location' } ),
      { comp: [ '=' ], controlConfig: { label: 'Ubicación', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'description',  text:'Tipo de Contenedor', inExpand: 'byn_type' } ),
      { comp: [ '=' ], controlConfig: { label: 'Tipo de Contenedor', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'name',  text:'Empresa', inExpand: 'enterprise' } ),
      { comp: [ '=' ], controlConfig: { label: 'Empresa', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'deep',  text:'Profundidad' } ),
      { comp: [ '=' ], controlConfig: { label: 'Profundidad', type:'string' } } );

    this.tableConfig.updateTableSubject = this.reciclerBynService.updateTableSubject;
    this.tableConfig.provider           = this.reciclerBynService;
    this.tableConfig.getAllMethodName   = 'getRecicleyBynData';
    this.tableConfig.expand             = '?expand=enterprise,byn_type,location&';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;

    if ( this.goToCreate === null ){
        this.goToCreate = this.reciclerBynService.goToCreateSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Nuevo Contenedor' );
        this.formConfig.setContext( 'create' );

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
      } });
    }

    if ( this.goToEdit !== null ){
        this.goToEdit.unsubscribe();
    }
    this.goToEdit = this.reciclerBynService.goToEditSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Editar Contenedor' );
        this.generalService.presentLoading();
        this.reciclerBynService.get( params );
        this.formConfig.setContext( 'edit' );

        if ( this.getItem !== null ){
          this.getItem.unsubscribe();
        }
        this.getItem = this.reciclerBynService.getOK.subscribe({  next: ( params: any ) => {
            this.generalService.dismissLoading();
            this.formConfig.model = params;
        } });

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
    } });


    this.showForm = false;
  }

  setFormFields( fCOnfig:BootstrapFormConfig ){
    fCOnfig.clearFields();
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Descripcion:', field: 'description', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Tipo de residuo:', field: 'byn_type_id', type: 'select', validator: new BootstrapFormRequired(), originDataSubject:this.reciclerBynTypeService.getAllOK, provider: this.reciclerBynTypeService, getDataFunction:'getAllTypeBynData' } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Ubicación:', field: 'location_id', type: 'select', validator: new BootstrapFormRequired(), originDataSubject:this.locationsService.getAllOK, provider: this.locationsService, getDataFunction:'getAll' } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Empresa:', field: 'enterprise_id', type: 'select', validator: new BootstrapFormRequired(), originDataSubject:this.enterpriseService.getAllOK, provider: this.enterpriseService,  getDataFunction:'getAllEnterpriseData'} ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Profundidad:', field: 'deep', type: 'number', validator: new BootstrapFormRequired( { extraValidator:new BootstrapFormNumber({ min:0, max:1000 }) } ) } ) );
    fCOnfig.repeatBtnInTop = true;
    fCOnfig.loadData.next(true);
  }

  setFormButtons( fCOnfig:BootstrapFormConfig ){
    this.formConfig.clearButtons();

    this.backBtn = fCOnfig.addButton( new ButtonBootstrapFormConfig( { title:'Volver' } ) );
    this.saveBtn = fCOnfig.addButton( new ButtonBootstrapFormConfig( { title:'Guardar' } ) );

    if ( this.saveBtnEvnt !== null) {
      this.saveBtnEvnt.unsubscribe();
    }
    this.saveBtnEvnt = this.saveBtn.onClick.subscribe({  next: ( params: any ) => {
        fCOnfig.validateForm.next();
    } });

    if ( this.backBtnEvnt !== null){
        this.backBtnEvnt.unsubscribe();
    }
    this.backBtnEvnt = this.backBtn.onClick.subscribe({  next: ( params: any ) => {
        this.reciclerBynService.goToAbm();
    } });

    if ( this.goToAbmSubj !== null) {
        this.goToAbmSubj.unsubscribe();
    }
    this.goToAbmSubj = this.reciclerBynService.goToAbmSubj.subscribe({  next: ( params: any ) => {
        this.setConfig();
    } });

    if ( this.formIsValidated !== null ){
      this.formIsValidated.unsubscribe();
    }
    this.formIsValidated = fCOnfig.isValidated.subscribe({  next: ( params: any ) => {
        if ( params.success == true ){
          if (fCOnfig.getContext() == 'edit'){
            this.dataPutAndSubscribeResponse( fCOnfig.model );
          } else {
            this.dataPostAndSubscribeResponse( fCOnfig.model );
          }

        } else {
          this.generalService.showMessage( this.generalService.getMessageFErrors( params.errors ) );
        }
    } });

  }

  dataPutAndSubscribeResponse( model:Bin){
    if ( this.PutOK !== null ){
      this.PutOK.unsubscribe();
    }

    this.PutOK = this.reciclerBynService.PutOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.reciclerBynService.goToAbm();
    } });

    this.generalService.presentLoading();
    this.reciclerBynService.put( model );

  }

  dataPostAndSubscribeResponse( model:Bin){
    if ( this.PostOK !== null ){
      this.PostOK.unsubscribe();
    }

    this.PostOK = this.reciclerBynService.PostOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.reciclerBynService.goToAbm();
    } });

    this.generalService.presentLoading();
    this.reciclerBynService.post( model );
  }

  ngOnDestroy(){
    this.goToCreate.unsubscribe();
    if (this.goToEdit !== null){
      this.goToEdit.unsubscribe();
    }
    if ( this.saveBtnEvnt !== null ){
      this.saveBtnEvnt.unsubscribe();
    }
    if ( this.backBtnEvnt !== null ){
      this.backBtnEvnt.unsubscribe();
    }
    if ( this.goToAbmSubj !== null ){
      this.goToAbmSubj.unsubscribe();
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
  }

}
