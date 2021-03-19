import { Injectable      } from '@angular/core';
import { Subject }         from 'rxjs';
import { Router }          from '@angular/router';

import { AppUIUtilsService }    from './app.ui.utils.service';

@Injectable({ providedIn: 'root' })
export class UbicationsService {

  constructor(
    private  router:             Router,
    private generalService:    AppUIUtilsService
  ) { }

  public getAllOK:Subject<any>           = new Subject();
  public getAllKO:Subject<any>           = new Subject();
  public updateTableSubject:Subject<any> = new Subject();

  getAll( params:any ){
    let testData:any = {
      items: [
        { id: 1, lat: -33.050421, lng: -71.601699, addressStr: 'Av. Libertador 1365'  },
        { id: 2, lat: -33.058421, lng: -71.602699, addressStr: 'Av. Libertador 1365'  },
        { id: 3, lat: -33.052421, lng: -71.608699, addressStr: 'Av. Libertador 1365'  },
        { id: 4, lat: -33.057421, lng: -71.604699, addressStr: 'Av. Libertador 1365'  },
        { id: 5, lat: -33.050621, lng: -71.603699, addressStr: 'Av. Libertador 1365'  },
        { id: 6, lat: -33.050321, lng: -71.607699, addressStr: 'Av. Libertador 1365'  },
        { id: 7, lat: -33.058421, lng: -71.601699, addressStr: 'Av. Libertador 1365'  }
      ],
      _meta: {
        totalCount: 7,
        pageCount: 1
      }
    };
    this.getAllOK.next( testData );
  }

  getDataFBootstrapForm( params:any ){
    let out:any = [];
    for (let c = 0; c < params.items.length; c++){
      out.push({ value: params.items[c].id, text:params.items[c].addressStr });
    }
    return out;
  }

  public goToCreateSubj:Subject<any> = new Subject();
  goToCreate(){
    this.router.navigate( [ '/administracion' ] );
    this.goToCreateSubj.next(true);
  }

  goToEdit(){
    this.generalService.showMessage('Proximamente función de edición de ubicación')
  }
}
