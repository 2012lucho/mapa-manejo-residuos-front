export class ConfigTableModel {
  public id:string                     = '';
  public itemName:string               = '';
  public textNew:string                = 'Nuevo';
  public resaltado:any                 = [];
  public EnabledFilterFieldOptions:any = [];
  public expand:string                 = '';

  public updateTableSubject:any        = null;
  public ExtraFilterTerms:string       = '';
  public provider:any                  = null;
  public getAllMethodName:string       = '';
  public actionOptions:any             = {};
  public actionsEnabled:boolean        = false;
  public resaltadoEnabled:boolean      = false;
  public regSelect:boolean             = false;

  public filterFieldOptions:FilterFieldConfigTableModel[] = [];
  public filterContentOptions:FilterContentOptionTableModel[] = [];

  public style:any = {
    defaultBg: [ '#fff', '#eee' ],
  };
  public buttonsClass:string = 'btn-outline-info';

  clearFieldsOptions(){
    this.filterFieldOptions   = [];
    this.filterContentOptions = [];
  }

  addfilterFieldOption( fOption:FilterFieldConfigTableModel, fCOption: any = null ){
    this.filterFieldOptions.push( fOption );

    //se recrea el arreglo de filtros habilitados con cada opción agregada
    //a futuro puede ser que se modifique este comportamiento pudiendo omitirlo
    this.EnabledFilterFieldOptions = [];
    for ( let c=0; c < this.filterFieldOptions.length; c++ ){
      this.EnabledFilterFieldOptions.push( c );
    }

    if ( fCOption !== null ){
      this.addFilterFieldContentOption( new FilterContentOptionTableModel(
        {
          field: fOption.code,
          comp:  fCOption.comp,
          controlConfig: fCOption.controlConfig
        }
      ) );
    }

  }

  addFilterFieldContentOption( fCOption: FilterContentOptionTableModel ){
    this.filterContentOptions.push( fCOption );
  }

  constructor(){
    //se agrega opción por defecto para poder selecionar la opción de eliminar filtros
    // a futuro podría definirse que no se agregue si los filtros se desactivan
    this.addFilterFieldContentOption( new FilterContentOptionTableModel( { field: 'unfiltered', comp: [], controlConfig: { label: 'Sin filtrar' } } ) );
  }
}

export class FilterContentOptionTableModel{
  public field:string;
  public comp:any;
  public controlConfig:any;

  constructor( config:any ){
    this.field         = config.field;
    this.comp          = config.comp;
    this.controlConfig = config.controlConfig;
  }
}

export class FilterFieldConfigTableModel{
  public code:string     = '';
  public text:string     = '';
  public enabled:boolean = true;
  public inExpand:string = '';
  public formatFunction:any = ( i:any )=>{ return i; }

  constructor( config:any ){
    this.code = config.code;
    this.text = config.text;

    if ( config.hasOwnProperty( 'inExpand' ) ){
      this.inExpand = config.inExpand;
    }

    if ( config.hasOwnProperty( 'formatFunction' ) ){
      this.formatFunction = config.formatFunction;
    }

  }
}
