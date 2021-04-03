import { Component, OnInit, Input } from '@angular/core';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, BootstrapFormElement } from './model/bootstrap-form-config';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.sass']
})
export class BootstrapFormComponent implements OnInit {

  @Input() config:BootstrapFormConfig = new BootstrapFormConfig();

  private loadData:any = null;
  private formatModelData:any = null;
  private subscriptionDataOrigin:any = [];
  private validateForm:any = null;
  private validationResult:any = { success:true, errors:[] }

  constructor() { }

  ngOnInit(): void {
    this.formatModelData = this.config.formatModelData.subscribe({  next: ( params: any ) => {
      for ( let c=0; c < this.config.elements.length; c++ ){
        this.config.model[ this.config.elements[ c ].field ] = this.config.elements[ c ].formatFunction( this.config.model[ this.config.elements[ c ].field ] );
      }
      this.config.modelDataFormated.next( { extraInfo:{ validationResult:this.validationResult } } );
    } });

    this.loadData = this.config.loadData.subscribe({  next: ( params: any ) => {
      for ( let c=0; c < this.config.elements.length; c++ ){
        if ( this.config.elements[ c ].type == 'select' && this.config.elements[ c ].originDataSubject !== null ){
          let subscriptionDO:any = this.config.elements[ c ].originDataSubject.subscribe({  next: ( params: any ) => {
             this.config.elements[ c ].options = this.config.elements[ c ].provider.getDataFBootstrapForm( params );
          }});
          this.subscriptionDataOrigin.push( subscriptionDO );
          this.config.elements[ c ].provider[this.config.elements[ c ].getDataFunction]();
        }
      }
    } });
    this.config.loadData.next(true);

    this.validateForm = this.config.validateForm.subscribe({  next: ( params: any ) => {
      this.validationResult.errors = [];
      this.validationResult.success = true;
      for ( let c=0; c < this.config.elements.length; c++ ){
        if ( this.config.elements[ c ].validator !== null && !this.config.elements[ c ].validator.validate() ){
            this.validationResult.success = false;
            this.validationResult.errors.push( this.config.elements[ c ].getValidatorErrors() );
        }
      }
      this.config.isValidated.next( this.validationResult );

    } });

  }

  fieldEmpty( input:any ){
    return input == '' || input === null || input === undefined;
  }

  fillOptions( optionsArr:any, data:any ){
      optionsArr = [];
      for ( let c=0; c < data.length; c++ ){
        optionsArr.push({ value: data[c].value, text: data[c].text });
      }
  }

  elementOnClik( element:BootstrapFormElement ){
    element.onClick.next();
  }

  ngOnDestroy(){
    this.loadData.unsubscribe();
    this.formatModelData.unsubscribe();
    this.validateForm.unsubscribe();
  }

}
