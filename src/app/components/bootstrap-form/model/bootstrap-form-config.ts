import { Subject }  from 'rxjs';

export class BootstrapFormConfig {
  public title:string = '';
  public buttons:ButtonBootstrapFormConfig[]  = [];
  public elements:BootstrapFormElement[]   = [];
  public repeatBtnInTop:boolean = true;
  public model:any = {};

  public loadData:Subject<any> = new Subject();
  public validateForm:Subject<any> = new Subject();
  public formatModelData:Subject<any> = new Subject();
  public modelDataFormated:Subject<any> = new Subject();
  public isValidated:Subject<any> = new Subject();
  public contextChanged:Subject<any> = new Subject();

  //Esta propiedad se usa para definir el tipo de visualización, más adelante
  //habría que ver como hacerlo de una mejor forma
  // common, formulario común responsivo
  // in-line, formulario con todos los campos en las misma fila dentro de lo posible
  public formLayountType:string = 'common';
  public elementContentClass:string = 'col col-md-6 col-lg-4';
  setFormLayount( flt:string ){
    this.formLayountType = flt;
    switch (this.formLayountType){
      case 'common':
        this.elementContentClass = 'col col-md-6 col-lg-4';
      break;
      case 'in-line':
        this.elementContentClass = 'col-auto';
      break;
    }
  }

  // Esta propiedad debe ser usada para especificar un dientificador del contexto
  // de uso actual de formulario, que se usa para terner una referencia sobre si
  // por ej se está usando para la creación o edición de información
  private context:string = '';

  constructor(){

  }

  setContext( context:string ){
    this.context = context;
    this.contextChanged.next( { formConfig:this, context:context } );
  }

  getContext(){
    return this.context;
  }

  setTitle( title:string ){
    this.title = title;
  }

  clearFields(){
    this.elements = [];
  }

  AddElement( element:BootstrapFormElement ):BootstrapFormElement{
    element.setFormConfig( this );
    this.elements.push( element );
    return element;
  }

  getFieldByFieldName( fieldName:string ){
    for ( let c = 0; c < this.elements.length; c++ ){
      if ( this.elements[c].field == fieldName ){
        return this.elements[c];
      }
    }
    return null;
  }

  clearButtons(){
    this.buttons = [];
  }

  addButton( btn:ButtonBootstrapFormConfig ):ButtonBootstrapFormConfig{
    this.buttons.push( btn );
    return btn;
  }
}

export class BootstrapFormElement {
  public title:string = '';
  public field:string = '';

  public type:string = 'text';
  setType( type:string ){
    this.type = type;
  }

  //Este arreglo define que tipos de campos usan el tag INPUT en el HTML
  protected inputTypes = ['text', 'number', 'password', 'email', 'date', 'time'];

  //Función definida para dar formato al label o al contenido del elemento segun corresponda
  public formatFunction:any = ( i:any )=>{ return i; }

  public originDataSubject:any = null;
  public provider:any = null;
  public getDataFunction:any = null;

  public onClick:Subject<any> = new Subject();

  public options:any = [];

  public validator:any = null;
  public onError:boolean = false;
  public errorText:string = '';

  public visibleOnlyInContexts:any = [];
  constructor( p:any ){
      if ( p.hasOwnProperty( 'title' ) ){
        this.title = p.title;
      }

      if ( p.hasOwnProperty( 'visibleOnlyInContexts' ) ){
        this.visibleOnlyInContexts = p.visibleOnlyInContexts;
      }
  }

  getTitle(){
    return this.title;
  }

  protected elementType:string = 'base';
  isElementType( type:string ){
    return type == this.elementType;
  }

  getValidatorErrors(){
    return this.errorText;
  }

  public extraClass:string = '';
  getExtraClass(){
    return this.extraClass;
  }

  protected disabled:boolean = false;
  setDisabled( disabled:boolean ){
    this.disabled = disabled;
  }
  getDisabled(){
    return this.disabled;
  }

  protected visible:boolean = true;
  setVisible( visible:boolean ){
    this.visible = visible;
  }
  isVisible(){
    //Si se definió que solo sea visible en algunos contextos
    let context:string = this.getContext();
    let found:boolean  = false;
    for ( let c=0; c < this.visibleOnlyInContexts.length; c++ ){
      if (this.visibleOnlyInContexts[c] == context){
        found = true;
        break;
      }
    }

    if (this.visibleOnlyInContexts.length > 0){
      this.visible = this.visible && found;
    }

    return this.visible;
  }

  //Retorna true si el campo se trata de uno que use el tag INPUT en el HTML
  // Se usa mas que nada para cuestiones de visualizacion en la plantilla
  isInputType(){
    for ( let c = 0; c<this.inputTypes.length; c++){
      if (this.inputTypes[c] == this.type){
        return true;
      }
    }
    return false;
  }

  isType( type:string ){
    return this.type == type;
  }

  protected formConfig:any = null;
  setFormConfig( fc:BootstrapFormConfig ){
    this.formConfig = fc;
    for ( let c=0; c < this.subFields.length; c ++ ){
      this.subFields[ c ].setFormConfig( fc );
    }
  }
  getFormConfig(){
    return this.formConfig;
  }

  getContext(){
    return this.formConfig.getContext();
  }

  public subFields:BootstrapFormElement[] = [];
  AddElement( field:BootstrapFormElement ):BootstrapFormElement{
    this.subFields.push( field );
    return field;
  }
}

export class FieldBootstrapFormConfig extends BootstrapFormElement {
  public placeholder:string = '';

  constructor( p:any ){
    super( p );
    this.elementType = 'field';

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

    if ( p.hasOwnProperty( 'formatFunction' ) ){
      this.formatFunction = p.formatFunction;
    }

    if (this.type == 'select' && p.hasOwnProperty( 'originDataSubject' ) ){
      this.originDataSubject = p.originDataSubject;
      this.provider = p.provider;
      this.getDataFunction = p.getDataFunction;
    }

    this.field = p.field;
  }
}

export class ButtonBootstrapFormConfig extends BootstrapFormElement {
  constructor( p:any ){
    super( p );

    this.elementType = 'button';
    this.extraClass  = 'btn-outline-info';
  }
}
