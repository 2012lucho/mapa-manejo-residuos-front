import { Component, OnInit } from '@angular/core';

import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';

import { EnterpriseService } from '../../../services/enterprise.service';
import { AppUIUtilsService }    from '../../../services/app.ui.utils.service';
import { Enterprise }    from '../../../models/enterprise';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired, BootstrapFormNumber } from '../../../components/bootstrap-form/bootstrap-form-validators';
@Component({
  selector: 'app-empresas-abm',
  templateUrl: './empresas-abm.component.html',
  styleUrls: ['./empresas-abm.component.sass']
})
export class EmpresasAbmComponent implements OnInit {

  public tableConfig:ConfigTableModel = new ConfigTableModel();
  public showForm:boolean = false;
  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();

  private goToCreate:any  = null;
  private saveBtnEvnt:any = null;
  private saveBtn:any     = null;
  private backBtn:any     = null;
  private backBtnEvnt:any = null;
  private goToEnterpriseSubj:any = null;

  private goToEdit:any = null;
  private getItem:any = null;

  private PutOK:any = null;

  private PostOK:any = null;

  private formIsValidated:any = null;
  private action:string = 'create';
  constructor(
    private enterpriseService: EnterpriseService,
    private generalService:    AppUIUtilsService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(){
    this.tableConfig.id       = 'enterprises';
    this.tableConfig.itemName = 'Empresa';
    this.tableConfig.textNew  = 'Nueva';

    this.tableConfig.clearFieldsOptions();
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'name',  text:'Nombre' } ),
      { comp: [ '=' ], controlConfig: { label: 'Nombre', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'rut',  text:'Rut' } ),
      { comp: [ '=' ], controlConfig: { label: 'Rut', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'address_road',  text:'Dirección (calle)' } ),
      { comp: [ '=' ], controlConfig: { label: 'Dirección (calle)', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'address_number',  text:'Dirección (número)' } ),
      { comp: [ '=' ], controlConfig: { label: 'Dirección (número)', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'admin_name',  text:'Nombre administrador' } ),
      { comp: [ '=' ], controlConfig: { label: 'Nombre administrador', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'admin_surname',  text:'Apellido Administrador' } ),
      { comp: [ '=' ], controlConfig: { label: 'Apellido Administrador', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'phone',  text:'Teléfono' } ),
      { comp: [ '=' ], controlConfig: { label: 'Teléfono', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'email',  text:'Email' } ),
      { comp: [ '=' ], controlConfig: { label: 'Email', type:'string' } } );

    this.tableConfig.updateTableSubject = this.enterpriseService.updateTableSubject;
    this.tableConfig.provider           = this.enterpriseService;
    this.tableConfig.getAllMethodName   = 'getAllEnterpriseData';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;

    if ( this.goToCreate !== null ){
        this.goToCreate.unsubscribe();
    }
    this.goToCreate = this.enterpriseService.goToCreateSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Nueva Empresa' );
        this.formConfig.model = new Enterprise();
        this.action = 'create';

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
    } });

    if ( this.goToEdit !== null ){
        this.goToEdit.unsubscribe();
    }
    this.goToEdit = this.enterpriseService.goToEditSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Editar Empresa' );
        this.generalService.presentLoading();
        this.enterpriseService.get( params );
        this.action = 'edit';

        if ( this.getItem !== null ){
          this.getItem.unsubscribe();
        }
        this.getItem = this.enterpriseService.getOK.subscribe({  next: ( params: any ) => {
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
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'Nombre de la empresa:', field: 'name', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'RUT:', field: 'rut', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'Dirección (calle):', field: 'address_road', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'Dirección (número):', field: 'address_number', type: 'number', validator: new BootstrapFormRequired({ extraValidator:new BootstrapFormNumber({ min:0, max:100000 }) }) } ) );
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'Administrador (nombre/s):', field: 'admin_name', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'Administrador (apellido/s):', field: 'admin_surname', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'Contacto (teléfono):', field: 'phone', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.addField( new FieldBootstrapFormConfig(
      { title:'Contacto (Email):', field: 'email', type: 'email', validator: new BootstrapFormRequired() } ) );
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
        this.enterpriseService.goToEnterpriseAbm();
    } });

    if ( this.goToEnterpriseSubj !== null) {
        this.goToEnterpriseSubj.unsubscribe();
    }
    this.goToEnterpriseSubj = this.enterpriseService.goToEnterpriseSubj.subscribe({  next: ( params: any ) => {
        this.setConfig();
    } });

    if ( this.formIsValidated !== null ){
      this.formIsValidated.unsubscribe();
    }
    this.formIsValidated = fCOnfig.isValidated.subscribe({  next: ( params: any ) => {
        if ( params.success == true ){
          if (this.action == 'edit'){
            this.dataPutAndSubscribeResponse( fCOnfig.model );
          } else {
            this.dataPostAndSubscribeResponse( fCOnfig.model );
          }

        } else {
          this.generalService.showMessage( this.generalService.getMessageFErrors( params.errors ) );
        }
    } });

  }

  dataPutAndSubscribeResponse( model:Enterprise ){
    if ( this.PutOK !== null ){
      this.PutOK.unsubscribe();
    }

    this.PutOK = this.enterpriseService.PutOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.enterpriseService.goToEnterpriseAbm();
    } });

    this.generalService.presentLoading();
    this.enterpriseService.put( model );

  }

  dataPostAndSubscribeResponse( model:Enterprise ){
    if ( this.PostOK !== null ){
      this.PostOK.unsubscribe();
    }

    this.PostOK = this.enterpriseService.PostOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.enterpriseService.goToEnterpriseAbm();
    } });

    this.generalService.presentLoading();
    this.enterpriseService.post( model );
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
    if ( this.goToEnterpriseSubj !== null ){
      this.goToEnterpriseSubj.unsubscribe();
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
