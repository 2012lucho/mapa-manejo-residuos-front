import { Component, OnInit } from '@angular/core';

import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';

import { ReciclerBynTypeService } from '../../../services/recicler.byn.type.service';
import { AppUIUtilsService }         from '../../../services/app.ui.utils.service';

import { BynType }         from '../../../models/byn.type';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired } from '../../../components/bootstrap-form/bootstrap-form-validators';

@Component({
  selector: 'app-tipo-cont-abm',
  templateUrl: './tipo-cont-abm.component.html',
  styleUrls: ['./tipo-cont-abm.component.sass']
})
export class TipoContAbmComponent implements OnInit {

  public tableConfig:ConfigTableModel = new ConfigTableModel();
  public showForm:boolean = false;
  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();
  private formIsValidated:any = null;

  private goToCreate:any  = null;
  private saveBtnEvnt:any = null;
  private saveBtn:any     = null;
  private backBtn:any     = null;
  private backBtnEvnt:any = null;
  private goToReciclerBynTypeSubj:any = null;

  private getAllOK:any = null;
  private goToEdit:any = null;
  private getItem:any = null;
  private PutOK:any = null;
  private PostOK:any = null;

  constructor(
    private reciclerBynType: ReciclerBynTypeService,
    private generalService:    AppUIUtilsService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(){
    this.tableConfig.id       = 'rBynTypes';
    this.tableConfig.itemName = 'Tipo de Contenedor';
    this.tableConfig.textNew  = 'Nuevo';

    this.tableConfig.clearFieldsOptions();
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'id',  text:'#' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'description',  text:'Descripción' } ),
      { comp: [ '=' ], controlConfig: { label: 'Código identificador', type:'string' } } );

    this.tableConfig.updateTableSubject = this.reciclerBynType.updateTableSubject;
    this.tableConfig.provider           = this.reciclerBynType;
    this.tableConfig.getAllMethodName   = 'getAllTypeBynData';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;


    if ( this.goToCreate !== null ){
        this.goToCreate.unsubscribe();
    }
    this.goToCreate = this.reciclerBynType.goToCreateSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.model = new BynType();
        this.formConfig.setTitle( 'Nuevo Tipo de Contenedor' );
        this.formConfig.setContext( 'create' );

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
    } });

    if ( this.goToEdit !== null ){
        this.goToEdit.unsubscribe();
    }
    this.goToEdit = this.reciclerBynType.goToEditSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Editar Tipo de Contenedor' );
        this.generalService.presentLoading();
        this.reciclerBynType.get( params );
        this.formConfig.setContext( 'edit' );

        if ( this.getItem !== null ){
          this.getItem.unsubscribe();
        }
        this.getItem = this.reciclerBynType.getOK.subscribe({  next: ( params: any ) => {
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
      { title:'Descripción:', field: 'description', type: 'text', validator: new BootstrapFormRequired() } ) );
    fCOnfig.repeatBtnInTop = false;
  }

  setFormButtons( fCOnfig:BootstrapFormConfig ){
    this.formConfig.clearButtons();

    this.backBtn = fCOnfig.addButton( new ButtonBootstrapFormConfig( { title:'Volver' } ) );
    this.saveBtn = fCOnfig.addButton( new ButtonBootstrapFormConfig( { title:'Guardar' } ) );

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
      this.reciclerBynType.goToReciclerBynTypeAbm();
    } });

    if ( this.goToReciclerBynTypeSubj !== null ){
      this.goToReciclerBynTypeSubj.unsubscribe();
    }
    this.goToReciclerBynTypeSubj = this.reciclerBynType.goToReciclerBynTypeSubj.subscribe({  next: ( params: any ) => {
      this.setConfig();
    } });

    if ( this.formIsValidated !== null ){
      this.formIsValidated.unsubscribe();
    }
    this.formIsValidated = this.formConfig.isValidated.subscribe({  next: ( params: any ) => {
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

  dataPutAndSubscribeResponse( model:BynType ){
    if ( this.PutOK !== null ){
      this.PutOK.unsubscribe();
    }

    this.PutOK = this.reciclerBynType.PutOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.reciclerBynType.goToReciclerBynTypeAbm();
    } });

    this.generalService.presentLoading();
    this.reciclerBynType.put( model );
  }

  dataPostAndSubscribeResponse( model:BynType ){
      if ( this.PostOK !== null ){
        this.PostOK.unsubscribe();
      }

      this.PostOK = this.reciclerBynType.PostOK.subscribe({  next: ( params: any ) => {
        this.generalService.dismissLoading();
        this.generalService.showMessage('Datos actualizados');
        this.reciclerBynType.goToReciclerBynTypeAbm();
      } });

      this.generalService.presentLoading();
      this.reciclerBynType.post( model );
  }


  ngOnDestroy(){
    this.goToCreate.unsubscribe();
    if ( this.saveBtnEvnt !== null ){
      this.saveBtnEvnt.unsubscribe();
    }
    if ( this.backBtnEvnt !== null ){
      this.backBtnEvnt.unsubscribe();
    }
    if ( this.goToReciclerBynTypeSubj !== null ){
      this.goToReciclerBynTypeSubj.unsubscribe();
    }
    if ( this.formIsValidated !== null ){
      this.formIsValidated.unsubscribe();
    }
    if ( this.getAllOK !== null ){
      this.getAllOK.unsubscribe();
    }
    if ( this.goToEdit !== null ){
      this.goToEdit.unsubscribe();
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
