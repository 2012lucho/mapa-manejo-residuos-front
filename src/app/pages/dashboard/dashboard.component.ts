import { Component, OnInit } from '@angular/core';

import { ReciclerBynService }         from '../../services/recicler.byn.service';
import { LocationsService }           from '../../services/locations.service';
import { FormateoService }            from '../../services/formateo.service';

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

  private dashboardParams:string = '';
  private LocationDataGeted:any = null;
  private mapPointsPointClick:any  = null;
  private goToMarkerEvnt:any       = null;

  public tableConfig:ConfigGrillaContenedores = new ConfigGrillaContenedores();
  public mapPoints:MapPoint[] = [];
  public mapPointsConfig: MapPointConfig = new MapPointConfig();
  public filterListConfig:DashboardFinderConfigModel = new DashboardFinderConfigModel();

  constructor(
    private reciclerBynService: ReciclerBynService,
    private locationsService:   LocationsService,
    private formateoService:    FormateoService
  ) { }

  ngOnInit(): void {
    this.setConfig();
    this.setInitialData();
  }

  setConfig(){
    //subcripción
    this.LocationDataGeted = this.locationsService.getAllOK.subscribe({  next: ( params: any ) => {
        this.tableConfig.tableData = params;
        this.mapPoints             = this.locationsService.getMapPoints( params.items, this.mapPointsConfig );
        this.mapPointsConfig.updateMarkers.next( { points: this.mapPoints } );
    } });

    this.locationsService.getAll( '?expand=byns.average_fill_levels,byns.byn_type,byns.enterprise,byns.fill_levels&range=1616471867,1616478522&' );

    //subcripción a click en punto del mapa
    this.mapPointsPointClick = this.mapPointsConfig.mapPointClick.subscribe({  next: ( params: any ) => {
      this.tableConfig.highlightRow.next( Number(params.markerOption.label) );
    } });

    //subscripción a click en marcador en tabla
    this.goToMarkerEvnt = this.tableConfig.goToMarkerEvnt.subscribe({  next: ( params: any ) => {
      this.mapPointsConfig.mapGoToPoint.next( params );
    } });
  }

  setInitialData(){
    let actualDate:Date = new Date();
    let startDate:Date = new Date( actualDate );
    startDate.setDate( startDate.getDate() - 7);
    this.filterListConfig.model.date_start = this.formateoService.getFormatedDate( startDate, 'YYYY-MM-DD' );
    this.filterListConfig.model.date_end   = this.formateoService.getFormatedDate( actualDate, 'YYYY-MM-DD' );
    this.tableConfig.filterParams          = this.filterListConfig.model;
  }

  ngOnDestroy(){
    this.LocationDataGeted.unsubscribe();
    this.mapPointsPointClick.unsubscribe();
    this.goToMarkerEvnt.unsubscribe();
  }



}
