import { Component, OnInit, Input } from '@angular/core';

import { BootstrapFormConfig, ButtonBootstrapFormConfig } from './model/bootstrap-form-config';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.sass']
})
export class BootstrapFormComponent implements OnInit {

  @Input() config:BootstrapFormConfig = new BootstrapFormConfig();

  private loadData:any = null;
  private subscriptionDataOrigin:any = [];
  private validateForm:any = null;
  private validationResult:any = { success:true, errors:[] }

  constructor() { }

  ngOnInit(): void {
    this.loadData = this.config.loadData.subscribe({  next: ( params: any ) => {
      for ( let c=0; c < this.config.fields.length; c++ ){
        if ( this.config.fields[ c ].type == 'select' ){
          let subscriptionDO:any = this.config.fields[ c ].originDataSubject.subscribe({  next: ( params: any ) => {
             this.config.fields[ c ].options = this.config.fields[ c ].provider.getDataFBootstrapForm( params );
          }});
          this.subscriptionDataOrigin.push( subscriptionDO );
          this.config.fields[ c ].provider[this.config.fields[ c ].getDataFunction]();
        }
      }
    } });
    this.config.loadData.next(true);

    this.validateForm = this.config.validateForm.subscribe({  next: ( params: any ) => {
      this.validationResult.errors = [];
      this.validationResult.success = true;
      for ( let c=0; c < this.config.fields.length; c++ ){
        if ( this.config.fields[ c ].validator !== null && !this.config.fields[ c ].validator.validate() ){
            this.validationResult.success = false;
            this.validationResult.errors.push( this.config.fields[ c ].getValidatorErrors() );
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

  btnOnClik( btn:ButtonBootstrapFormConfig ){
    btn.onClick.next();
  }

  ngOnDestroy(){
    this.loadData.unsubscribe();
    this.validateForm.unsubscribe();
  }

}
