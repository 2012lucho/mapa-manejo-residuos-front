import { Component, OnInit } from '@angular/core';

import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';

import { UsersService }         from '../../../services/users.service';
import { AppUIUtilsService }    from '../../../services/app.ui.utils.service';
import { User }                 from '../../../models/user';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired } from '../../../components/bootstrap-form/bootstrap-form-validators';

@Component({
  selector: 'app-users-abm',
  templateUrl: './users-abm.component.html',
  styleUrls: ['./users-abm.component.sass']
})
export class UsersAbmComponent implements OnInit {

  public tableConfig:ConfigTableModel = new ConfigTableModel();
  public showForm:boolean = false;
  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();

  private goToCreate:any  = null;
  private saveBtnEvnt:any = null;
  private saveBtn:any     = null;
  private backBtn:any     = null;
  private backBtnEvnt:any = null;
  private goToUsersSubj:any = null;

  private goToEdit:any = null;
  private getItem:any = null;

  private PutOK:any = null;

  private PostOK:any = null;

  private formIsValidated:any = null;

  constructor(
    private usersService:      UsersService,
    private generalService:    AppUIUtilsService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig():void{
    this.tableConfig.id       = 'users';
    this.tableConfig.itemName = 'Usuario';
    this.tableConfig.textNew  = 'Nuevo';

    this.tableConfig.clearFieldsOptions();
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'username',  text:'Nombre de Usuario' } ),
      { comp: [ '=' ], controlConfig: { label: 'Nombre de Usuario', type:'string' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'role_id',  text:'Rol Id' } ),
      { comp: [ '=' ], controlConfig: { label: 'Rol Id', type:'select' } } );

    this.tableConfig.updateTableSubject = this.usersService.updateTableSubject;
    this.tableConfig.provider           = this.usersService;
    this.tableConfig.getAllMethodName   = 'getAll';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;

    if ( this.goToCreate !== null ){
        this.goToCreate.unsubscribe();
    }
    this.goToCreate = this.usersService.goToCreateSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Nuevo Usuario' );
        this.formConfig.model = new User();
        this.formConfig.setContext( 'create' );

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
    } });

    if ( this.goToEdit !== null ){
        this.goToEdit.unsubscribe();
    }
    this.goToEdit = this.usersService.goToEditSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Editar Usuario' );
        this.generalService.presentLoading();
        this.usersService.get( params );
        this.formConfig.setContext( 'edit' );

        if ( this.getItem !== null ){
          this.getItem.unsubscribe();
        }
        this.getItem = this.usersService.getOK.subscribe({  next: ( params: any ) => {
            this.generalService.dismissLoading();
            this.formConfig.model = params;
        } });

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
    } });

    this.showForm = false;

  }

  setFormFields( fCOnfig:BootstrapFormConfig ):void{
    fCOnfig.clearFields();
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Nombre de usuario:', field: 'username', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Contraseña:', field: 'password', type: 'password', validator: new BootstrapFormRequired() } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Rol:', field: 'role_id', type: 'select', validator: new BootstrapFormRequired(),
        originDataSubject:this.usersService.getAllRolesOK, provider: this.usersService, getDataFunction:'getRoles' } ) );
  }

  setFormButtons( fCOnfig:BootstrapFormConfig ):void{
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
        this.usersService.goToUsersAbm();
    } });

    if ( this.goToUsersSubj !== null) {
        this.goToUsersSubj.unsubscribe();
    }
    this.goToUsersSubj = this.usersService.goToUsersSubj.subscribe({  next: ( params: any ) => {
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

  dataPutAndSubscribeResponse( model:User ){
    if ( this.PutOK !== null ){
      this.PutOK.unsubscribe();
    }

    this.PutOK = this.usersService.PutOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.usersService.goToUsersAbm();
    } });

    this.generalService.presentLoading();
    this.usersService.put( model );

  }

  dataPostAndSubscribeResponse( model:User ){
    if ( this.PostOK !== null ){
      this.PostOK.unsubscribe();
    }

    this.PostOK = this.usersService.PostOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.usersService.goToUsersAbm();
    } });

    this.generalService.presentLoading();
    this.usersService.post( model );
  }

  ngOnDestroy():void{
    this.goToCreate.unsubscribe();
    this.goToEdit.unsubscribe();
    if (this.saveBtnEvnt !== null){
      this.saveBtnEvnt.unsubscribe();
    }
    if ( this.backBtnEvnt !== null ){
      this.backBtnEvnt.unsubscribe();
    }
    if ( this.goToUsersSubj !== null ){
      this.goToUsersSubj.unsubscribe();
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
