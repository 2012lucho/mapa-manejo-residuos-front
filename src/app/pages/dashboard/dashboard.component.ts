import { Component, OnInit } from '@angular/core';

import { ReciclerBynService }         from '../../services/recicler.byn.service';
import { ConfigGrillaContenedores }   from '../../components/grilla-contenedores/grilla-contenedores.config.model';
import { MapPoint }                   from '../../components/map-points/model/map-point';
import { DashboardFinderConfigModel } from '../../components/dashboard-finder/dashboard-finder.config.model';
import { MapPointConfig }             from '../../components/map-points/model/map.points.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  private dashboardParams:any = {};
  private reciclerBynDataGeted:any = null;
  private mapPointsPointClick:any  = null;
  private goToMarkerEvnt:any       = null;

  public tableConfig:ConfigGrillaContenedores = new ConfigGrillaContenedores();
  public mapPoints:MapPoint[] = [];
  public mapPointsConfig: MapPointConfig = new MapPointConfig();
  public filterListConfig:DashboardFinderConfigModel = new DashboardFinderConfigModel();

  constructor(
    private reciclerBynService: ReciclerBynService
  ) { }

  ngOnInit(): void {
    //subcripción
    this.reciclerBynDataGeted = this.reciclerBynService.reciclerBynDataGeted.subscribe({  next: ( params: any ) => {
        this.tableConfig.tableData = params;
        this.mapPoints             = this.reciclerBynService.getMapPoints( params.items, this.mapPointsConfig );
        this.filterListConfig      = this.reciclerBynService.getFilterListConfig();
        this.mapPointsConfig.updateMarkers.next( true );
    } });

    this.reciclerBynService.goToDashboar( this.dashboardParams );

    //subcripción a click en punto del mapa
    this.mapPointsPointClick = this.mapPointsConfig.mapPointClick.subscribe({  next: ( params: any ) => {
      this.tableConfig.highlightRow.next( Number(params.markerOption.label) );
    } });

    //subscripción a click en marcador en tabla
    this.goToMarkerEvnt = this.tableConfig.goToMarkerEvnt.subscribe({  next: ( params: any ) => {
      this.mapPointsConfig.mapGoToPoint.next( params );
    } });
  }

  ngOnDestroy(){
    this.reciclerBynDataGeted.unsubscribe();
    this.mapPointsPointClick.unsubscribe();
    this.goToMarkerEvnt.unsubscribe();
  }



}
