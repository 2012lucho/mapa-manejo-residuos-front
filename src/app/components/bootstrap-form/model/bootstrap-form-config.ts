import { Subject }  from 'rxjs';

export class BootstrapFormConfig {
  public title:string = '';
  public buttons:ButtonBootstrapFormConfig[]  = [];
  public fields:FieldBootstrapFormConfig[]   = [];
  public repeatBtnInTop:boolean = true;
  public model:any = {};

  public loadData:Subject<any> = new Subject();
  public validateForm:Subject<any> = new Subject();
  public isValidated:Subject<any> = new Subject();

  constructor(){

  }

  setTitle( title:string ){
    this.title = title;
  }

  clearFields(){
    this.fields = [];
  }

  addField( field:FieldBootstrapFormConfig ):FieldBootstrapFormConfig{
    field.setFormConfig( this );
    this.fields.push( field );
    return field;
  }

  clearButtons(){
    this.buttons = [];
  }

  addButton( btn:ButtonBootstrapFormConfig ):ButtonBootstrapFormConfig{
    this.buttons.push( btn );
    return btn;
  }
}

export class FieldBootstrapFormConfig {
  public title:string = '';
  public field:string = '';
  public placeholder:string = '';
  public type:string = 'text';

  public options:any = [];
  public originDataSubject:any = null;
  public provider:any = null;
  public getDataFunction:any = null;

  public validator:any = null;
  public onError:boolean = false;
  public errorText:string = '';

  private formConfig:any = null;
  setFormConfig( fc:BootstrapFormConfig ){
    this.formConfig = fc;
  }
  getFormConfig(){
    return this.formConfig;
  }

  getValidatorErrors(){
    return this.errorText;
  }

  constructor( p:any = {} ){
    if ( p.hasOwnProperty( 'title' ) ){
      this.title = p.title;
    }

    if ( p.hasOwnProperty( 'type' ) ){
      this.type = p.type;
    }

    if ( p.hasOwnProperty( 'placeholder' ) ){
      this.placeholder = p.placeholder;
    }

    if ( p.hasOwnProperty( 'validator' ) ){
      this.validator = p.validator;
      this.validator.setFieldObject( this );
    }

    if (this.type == 'select' && p.hasOwnProperty( 'originDataSubject' ) ){
      this.originDataSubject = p.originDataSubject;
      this.provider = p.provider;
      this.getDataFunction = p.getDataFunction;
    }

    this.field = p.field;
  }
}

export class ButtonBootstrapFormConfig {
  public title:string = '';
  public onClick:Subject<any> = new Subject();
  public buttonExtraClass:string = 'btn-outline-info';

  constructor( p:any = {} ){
    if ( p.hasOwnProperty( 'title' ) ){
      this.title = p.title;
    }
  }
}
