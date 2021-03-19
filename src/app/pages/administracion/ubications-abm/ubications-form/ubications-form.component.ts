import { Component, OnInit } from '@angular/core';

import { MapSelectModelConfig } from '../../../../components/map-select-point/model/map-select.model.config';

import { AppUIUtilsService }    from '../../../../services/app.ui.utils.service';

@Component({
  selector: 'app-ubications-form',
  templateUrl: './ubications-form.component.html',
  styleUrls: ['./ubications-form.component.sass']
})
export class UbicationsFormComponent implements OnInit {

  public mapConfig:MapSelectModelConfig = new MapSelectModelConfig();

  public formTitle:string = '';
  public position:any = { lat:0, lng:0 };

  private markerMove:any = null;

  constructor(
    private generalService:    AppUIUtilsService
  ) { }

  ngOnInit(): void {
      this.formTitle = 'Nueva Ubicación';

      this.markerMove = this.mapConfig.markerMove.subscribe({  next: ( params: any ) => {
          this.position.lat = params.position.lat();
          this.position.lng = params.position.lng();
      } });
  }

  ngOnDestroy(){
    this.markerMove.unsubscribe();
  }

  clickSave(){
    this.generalService.showMessage('Funcionalidad pendiente de implementación');
  }

}
