import { Component, OnInit } from '@angular/core';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { ConfigTableModel, FilterFieldConfigTableModel } from '../../../components/table-component/config.table.model';
import { AppUIUtilsService }    from '../../../services/app.ui.utils.service';

import { FillLevelService } from '../../../services/fill.level.service';
import { FormateoService } from '../../../services/formateo.service';
import { ReciclerBynService } from '../../../services/recicler.byn.service';
import { BootstrapFormRequired, BootstrapFormNumber, BootstrapFormDate } from '../../../components/bootstrap-form/bootstrap-form-validators';

import { FillLevel }  from '../../../models/fill.level';

@Component({
  selector: 'app-fill-level',
  templateUrl: './fill-level.component.html',
  styleUrls: ['./fill-level.component.sass']
})
export class FillLevelComponent implements OnInit {
  public tableConfig:ConfigTableModel = new ConfigTableModel();

  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();
  public showForm:boolean = false;

  private goToCreate:any = null;
  private goToEdit:any   = null;

  private saveBtnEvnt:any = null;
  private backBtnEvnt:any = null;
  private backBtn:any = null;
  private saveBtn:any = null;

  private goToAbmFillLevelSubj:any = null;
  private formIsValidated:any    = null;

  private getItem:any = null;
  private PutOK:any   = null;
  private PostOK:any  = null;

  constructor(
    private fillLevelService: FillLevelService,
    private generalService:   AppUIUtilsService,
    private formateoService:  FormateoService,
    private reciclerBynService: ReciclerBynService
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
      new FilterFieldConfigTableModel( { code:'date',  text:'Fecha', formatFunction:( i:any ) => { return this.formateoService.getSDateFromTimeStamp( i ); } } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Fecha', type:'date' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'byn_id',  text:'Id Contenedor' } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Id Contenedor', type:'number' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'description',  text:'Descripción Contenedor', inExpand:'byn' } ),
      { comp: [ '=' ], controlConfig: { label: 'Descripción Contenedor', type:'text' } } );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'date',  text:'Hora', formatFunction:( i:any ) => { return this.formateoService.getTimeFromTimeStamp( i ); } } ) );
    this.tableConfig.addfilterFieldOption(
      new FilterFieldConfigTableModel( { code:'level',  text:'Nivel de llenado', formatFunction:( i:any ) => { return this.formateoService.getPorcentajeFNumber( i ); } } ),
      { comp: [ '>', '<', '=', 'between' ], controlConfig: { label: 'Nivel de llenado', type:'number' } } );

    this.tableConfig.updateTableSubject = this.fillLevelService.updateTableSubject;
    this.tableConfig.provider           = this.fillLevelService;
    this.tableConfig.getAllMethodName   = 'getAllFillLevelData';
    this.tableConfig.expand             = '?expand=byn&';
    this.tableConfig.actionOptions      = { edit: true, new: true };
    this.tableConfig.actionsEnabled     = true;

    if ( this.goToCreate === null ){
        this.goToCreate = this.fillLevelService.goToCreateSubj.subscribe({  next: ( params: any ) => {
          this.showForm = true;
          this.formConfig.setTitle( 'Actualizar estado de contenedor' );
          this.formConfig.model = new FillLevel();
          this.formConfig.setContext( 'create' );

          this.setFormFields( this.formConfig );
          this.setFormButtons( this.formConfig );
        } });
    }

    if ( this.goToEdit !== null ){
        this.goToEdit.unsubscribe();
    }
    this.goToEdit = this.fillLevelService.goToEditSubj.subscribe({  next: ( params: any ) => {
        this.showForm = true;
        this.formConfig.setTitle( 'Editar estado de contenedor' );
        this.generalService.presentLoading();
        this.fillLevelService.get( params );
        this.formConfig.setContext( 'edit' );

        if ( this.getItem !== null ){
          this.getItem.unsubscribe();
        }
        this.getItem = this.fillLevelService.getOK.subscribe({  next: ( params: any ) => {
            this.generalService.dismissLoading();
            this.formConfig.model = params;
            this.formConfig.model.time = this.formateoService.getTimeFromTimeStamp( this.formConfig.model.date );
            this.formConfig.model.date = this.formateoService.getSDateToDateITS( this.formConfig.model.date );
        } });

        this.setFormFields( this.formConfig );
        this.setFormButtons( this.formConfig );
    } });


    if (this.goToAbmFillLevelSubj === null){
      this.goToAbmFillLevelSubj = this.fillLevelService.goToAbmFillLevelSubj.subscribe({  next: ( params: any ) => {
        this.setConfig();
      } });
    }

    this.showForm = false;

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
        this.fillLevelService.goToFillLevelAbm();
    } });

    if ( this.goToAbmFillLevelSubj !== null) {
        this.goToAbmFillLevelSubj.unsubscribe();
    }
    this.goToAbmFillLevelSubj = this.fillLevelService.goToAbmFillLevelSubj.subscribe({  next: ( params: any ) => {
        this.setConfig();
    } });

    if ( this.formIsValidated !== null ){
      this.formIsValidated.unsubscribe();
    }
    this.formIsValidated = fCOnfig.isValidated.subscribe({  next: ( params: any ) => {
        let dataFormated:any = fCOnfig.modelDataFormated.subscribe({  next: ( params: any ) => {
          params = params.extraInfo.validationResult;
          if ( params.success == true ){
            if (fCOnfig.getContext() == 'edit'){
              this.dataPutAndSubscribeResponse( fCOnfig.model );
            } else {
              this.dataPostAndSubscribeResponse( fCOnfig.model );
            }

          } else {
            this.generalService.showMessage( this.generalService.getMessageFErrors( params.errors ) );
          }
          dataFormated.unsubscribe();
        } });

        fCOnfig.formatModelData.next( true );
    } });

  }

  dataPutAndSubscribeResponse( model:FillLevel ){
    if ( this.PutOK !== null ){
      this.PutOK.unsubscribe();
    }

    this.PutOK = this.fillLevelService.PutOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.fillLevelService.goToFillLevelAbm();
    } });

    model.date = String( model.date + model.time );
    this.generalService.presentLoading();
    this.fillLevelService.put( model );

  }

  dataPostAndSubscribeResponse( model:FillLevel ){
    if ( this.PostOK !== null ){
      this.PostOK.unsubscribe();
    }

    this.PostOK = this.fillLevelService.PostOK.subscribe({  next: ( params: any ) => {
      this.generalService.dismissLoading();
      this.generalService.showMessage('Datos actualizados');
      this.fillLevelService.goToFillLevelAbm();
    } });

    model.date = String( model.date + model.time );
    this.generalService.presentLoading();
    this.fillLevelService.post( model );
  }

  setFormFields( fCOnfig:BootstrapFormConfig ){
    // CONFIGURACIÖN DE FORMULARIO
    fCOnfig.clearFields();
    fCOnfig.setTitle( 'Actualizar estado de contenedor' );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Contenedor:', field: 'byn_id', type: 'select', validator: new BootstrapFormRequired(), originDataSubject:this.reciclerBynService.getAllOK, provider: this.reciclerBynService,  getDataFunction:'getRecicleyBynData' } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Fecha:', field: 'date', type: 'date',
        validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } ),
        formatFunction:  ( i:any ) => { return this.formateoService.getTimeStampFDateStr(i); }
      } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Hora:', field: 'time', type: 'time',
        validator: new BootstrapFormRequired(),
        formatFunction:  ( i:any ) => { return this.formateoService.getTimeStampFTimeStr(i); }
      } ) );
    fCOnfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Porcentaje de llenado:', field: 'level', type: 'number', validator: new BootstrapFormRequired( { extraValidator:new BootstrapFormNumber({ min:0, max:100 }) } ) } ));
    fCOnfig.repeatBtnInTop = false;
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
    if ( this.goToAbmFillLevelSubj !== null ){
      this.goToAbmFillLevelSubj.unsubscribe();
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
