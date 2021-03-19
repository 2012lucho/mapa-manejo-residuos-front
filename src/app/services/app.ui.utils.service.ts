//Este componente tiene como finalida centralizar todas las funciones comunes
//que utilizarían todas las páginas, como los mensajes de alerta, loadings, etc.
// Esto es asi, por que al parecer no es una practica buena extender páginas en Angular
import { Injectable }        from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppUIUtilsService {

  public loadingPresent = false;
  public messageShow = false;
  public messageText = '';
  public messageTitle = 'Atención';

  private errorGenericText = 'Ha ocurrido un error no especificado, por favor reintente luego.';

  constructor(
  ) { }

  getAppTitle(){
    return 'Lymp.io';
  }

  showMessage( msg:string ){
    this.messageShow = true;
    this.messageText = msg;
  }

  dismissLoading(){
    this.loadingPresent = false;
  }

  presentLoading(d=0){
    this.loadingPresent = true;
  }

  getMessageFErrors( errors:any ){
    let out:string = '';
    for (let c=0; c < errors.length; c++){
      out += errors[ c ] + '\n\r';
    }
    return out;
  }

  errMsg( response:any ){
    if ( response.hasOwnProperty( 'error' ) ){
      if ( response.error.hasOwnProperty( 'message' ) ){
        this.showMessage( response.error.message );
      } else {
        this.showMessage( this.errorGenericText );
      }
    }
  }

}
