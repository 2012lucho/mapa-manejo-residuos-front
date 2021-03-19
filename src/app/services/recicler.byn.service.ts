import { Injectable      } from '@angular/core';
import { Subject }         from 'rxjs';
import { Router }          from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MapPoint }                   from '../components/map-points/model/map-point';
import { DashboardFinderConfigModel } from '../components/dashboard-finder/dashboard-finder.config.model';
import { MapPointConfig }             from '../components/map-points/model/map.points.config';

import { ConfigService }        from './config.service';
import { AuthService }          from './auth/auth.service';
import { AppUIUtilsService }    from './app.ui.utils.service';

import { Bin }    from '../models/bin';

@Injectable({ providedIn: 'root' })
export class ReciclerBynService {

  private configData:any = {};

  constructor(
    private router:         Router,
    private configService:  ConfigService,
    private http:           HttpClient,
    private authService:    AuthService,
    private generalService: AppUIUtilsService
  ) {
    this.configData = this.configService.getConfigData();
  }

  public reciclerBynDataGeted:Subject<any> = new Subject();
  public getAllOK:Subject<any>           = new Subject();
  public getAllKO:Subject<any>           = new Subject();
  public updateTableSubject:Subject<any> = new Subject();

  private mainAction = 'bynsAction';

  private LastElement:any = {};
  getRecicleyBynData( params:any ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ],
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.getAllOK.next(data);
            this.reciclerBynDataGeted.next( data );
        },
        err =>  {
            this.generalService.dismissLoading();
            this.getAllKO.next(err);
        }
      );
  }

  public getOK:Subject<any>           = new Subject();
  public getKO:Subject<any>           = new Subject();
  get( id:number ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+id,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.getOK.next(data);
        },
        err =>  {
            this.generalService.dismissLoading();
            this.getKO.next(err);
        }
      );
  }

  getDataFBootstrapForm( params:any ){
    let out:any = [];
    for (let c = 0; c < params.items.length; c++){
      out.push({ value: params.items[c].id, text:params.items[c].id });
    }
    return out;
  }

  goToDashboar( params:any ){
    this.getRecicleyBynData( params );
    this.router.navigate( [ '/' ] );
  }

  getMapPoints( params:any, mapPointConfig:MapPointConfig ){
    let out:MapPoint[] = [];
/*
    for ( let c=0; c < params.length; c++){
      out.push( new MapPoint(
        { lat: params[ c ].cc.lat, lng: params[ c ].cc.lng },
        { draggable: false, label: params[ c ].id },
        { url:'./assets/circle1.png', scaledSize: { width:25, height:25 } }
      ) );
    }
*/
    return out;
  }

  getFilterListConfig(): DashboardFinderConfigModel{
    let config:DashboardFinderConfigModel = new DashboardFinderConfigModel();

    config.fieldList = [
      { id: 'typeString', idControl:'typeStringCtrl', label: 'Tipo', options: [] },
      { id: 'typeString', idControl:'typeStringCtrl', label: 'Id', options: [] },
      { id: 'typeString', idControl:'typeStringCtrl', label: 'Contenedores', options: [] },
      { id: 'typeString', idControl:'typeStringCtrl', label: 'Desde', options: [] },
      { id: 'typeString', idControl:'typeStringCtrl', label: 'Hasta', options: [] },
    ];

    return config;
  }

  public goToCreateSubj:Subject<any> = new Subject();
  goToCreate(){
    this.router.navigate( [ '/administracion' ] );
    this.goToCreateSubj.next(true);
  }

  public PostOK:Subject<any> = new Subject();
  public PostKO:Subject<any> = new Subject();
  post( model:Bin ){
    this.http.post( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ], model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.PostOK.next(data);
        },
        err =>  {
            this.generalService.dismissLoading();
            this.PostKO.next(err);
        }
      );
  }

  public goToAbmSubj:Subject<any> = new Subject();
  goToAbm(){
    this.router.navigate( [ '/administracion' ] );
    this.goToAbmSubj.next(true);
  }

  public goToAbmFillLevelSubj:Subject<any> = new Subject();
  goToAbmFillLevel(){
    this.router.navigate( [ '/administracion' ] );
    this.goToAbmFillLevelSubj.next(true);
  }

  public goToEditSubj:Subject<any> = new Subject();
  goToEdit( id:any ){
    this.router.navigate( [ '/administracion' ] );
    this.goToEditSubj.next( id );
  }

  public PutOK:Subject<any> = new Subject();
  public PutKO:Subject<any> = new Subject();
  put( model:Bin ){
    this.http.put( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+model.id, model,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.PutOK.next(data);
        },
        err =>  {
            this.generalService.dismissLoading();
            this.PutKO.next(err);
        }
      );
  }


}
