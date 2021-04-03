import { Component, OnInit, Input } from '@angular/core';

import { MapSelectModelConfig } from '../../../../components/map-select-point/model/map-select.model.config';

import { AppUIUtilsService }    from '../../../../services/app.ui.utils.service';
import { LocationsService }    from '../../../../services/locations.service';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../../components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired } from '../../../../components/bootstrap-form/bootstrap-form-validators';

import { Location }           from '../../../../models/location';
import { LocationFormConfig } from './location.form.config';

@Component({
  selector: 'app-ubications-form',
  templateUrl: './ubications-form.component.html',
  styleUrls: ['./ubications-form.component.sass']
})
export class UbicationsFormComponent implements OnInit {

  public mapConfig:MapSelectModelConfig = new MapSelectModelConfig();

  private markerMove:any = null;

  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();
  private formIsValidated:any = null;
  public location:Location =  new Location();
  private getItem:any = null;

  @Input() config:LocationFormConfig = new LocationFormConfig();

  constructor(
    private appUIUtilsService:    AppUIUtilsService,
    private locationsService:     LocationsService
  ) { }

  ngOnInit(): void {
      this.setConfig();
  }

  setConfig(): void{

    if ( this.getItem !== null ){ this.getItem.unsubscribe();  }
    this.getItem = this.locationsService.getOK.subscribe({  next: ( params: any ) => {
        this.appUIUtilsService.dismissLoading();
        this.formConfig.model = params;
        this.mapConfig.setCords( this.formConfig.model.latitude, this.formConfig.model.longitude );
    } });

    this.setFormFields( this.formConfig );
    this.setFormButtons( this.formConfig );

    this.markerMove = this.mapConfig.markerMove.subscribe({  next: ( params: any ) => {
        this.formConfig.model.latitude  = params.position.lat();
        this.formConfig.model.longitude = params.position.lng();
    } });
  }

  setFormFields( fConfig:BootstrapFormConfig ){
    fConfig.clearFields();
    fConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Descripción:', field: 'description', type: 'text', validator: new BootstrapFormRequired() } ) );
    fConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Latitud:', field: 'latitude', type: 'text', validator: new BootstrapFormRequired() } ) );
    fConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Longitud:', field: 'longitude', type: 'text', validator: new BootstrapFormRequired() } ) );
    fConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Dirección Calle:', field: 'address_road', type: 'text', validator: new BootstrapFormRequired() } ) );
    fConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Dirección Número:', field: 'address_number', type: 'text', validator: new BootstrapFormRequired() } ) );

    fConfig.repeatBtnInTop = false;
    fConfig.model = this.location;
  }

  private backBtn:any = null;
  private saveBtn:any = null;
  private saveBtnEvnt:any = null;
  private backBtnEvnt:any = null;

  private goToEdit:any = null;
  private goToLocationSubj:any = null;
  setFormButtons( fConfig:BootstrapFormConfig ){
    this.formConfig.clearButtons();

    this.backBtn = fConfig.addButton( new ButtonBootstrapFormConfig( { title:'Volver' } ) );
    this.saveBtn = fConfig.addButton( new ButtonBootstrapFormConfig( { title:'Guardar' } ) );

    if ( this.saveBtnEvnt !== null ){  this.saveBtnEvnt.unsubscribe();   }
    this.saveBtnEvnt = this.saveBtn.onClick.subscribe({  next: ( params: any ) => {
      fConfig.validateForm.next();
    } });

    if ( this.backBtnEvnt !== null ){  this.backBtnEvnt.unsubscribe();   }
    this.backBtnEvnt = this.backBtn.onClick.subscribe({  next: ( params: any ) => {
      this.locationsService.goToLocationsAbm();
    } });

    if ( this.goToLocationSubj !== null ){  this.goToLocationSubj.unsubscribe();  }
    this.goToLocationSubj = this.locationsService.goToLocationSubj.subscribe({  next: ( params: any ) => {
      this.setConfig();
    } });

    if ( this.formIsValidated !== null ){   this.formIsValidated.unsubscribe();   }
    this.formIsValidated = this.formConfig.isValidated.subscribe({  next: ( params: any ) => {
      if ( params.success == true ){
        if (this.config.context == 'edit'){
          this.dataPutAndSubscribeResponse( fConfig.model );
        } else {
          this.dataPostAndSubscribeResponse( fConfig.model );
        }
      } else {
        this.appUIUtilsService.showMessage( this.appUIUtilsService.getMessageFErrors( params.errors ) );
      }
    } });
  }

  private PutOK:any = null;
  dataPutAndSubscribeResponse( model:Location ){
    if ( this.PutOK !== null ){ this.PutOK.unsubscribe();  }

    this.PutOK = this.locationsService.PutOK.subscribe({  next: ( params: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.appUIUtilsService.showMessage('Datos actualizados');
      this.locationsService.goToLocationsAbm();
    } });

    this.appUIUtilsService.presentLoading();
    this.locationsService.put( model );
  }


  private PostOK:any = null;
  dataPostAndSubscribeResponse( model:Location ){
    if ( this.PostOK !== null ){  this.PostOK.unsubscribe();   }

    this.PostOK = this.locationsService.PostOK.subscribe({  next: ( params: any ) => {
      this.appUIUtilsService.dismissLoading();
      this.appUIUtilsService.showMessage('Datos actualizados');
      this.locationsService.goToLocationsAbm();
    } });

    this.appUIUtilsService.presentLoading();
    this.locationsService.post( model );
  }

  ngOnDestroy(){
    this.markerMove.unsubscribe();
    if ( this.saveBtnEvnt !== null ){       this.saveBtnEvnt.unsubscribe();      }
    if ( this.backBtnEvnt !== null ){       this.backBtnEvnt.unsubscribe();      }
    if ( this.goToLocationSubj !== null ){  this.goToLocationSubj.unsubscribe(); }
    if ( this.formIsValidated !== null ){   this.formIsValidated.unsubscribe();  }
    if ( this.goToEdit !== null ){          this.goToEdit.unsubscribe();         }
    if ( this.getItem !== null ){           this.getItem.unsubscribe();          }
    if ( this.PutOK !== null ){             this.PutOK.unsubscribe();            }
    if ( this.PostOK !== null ){            this.PostOK.unsubscribe();           }
  }

}
