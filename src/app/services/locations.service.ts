import { Injectable      } from '@angular/core';
import { Subject }         from 'rxjs';
import { Router }          from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfigService }   from './config.service';
import { AuthService }     from './auth/auth.service';
import { AppUIUtilsService }     from './app.ui.utils.service';

import { Location }          from '../models/location';
import { MapPoint }          from '../components/map-points/model/map-point';
import { MapPointConfig }    from '../components/map-points/model/map.points.config';

@Injectable({ providedIn: 'root' })
export class LocationsService {

  constructor(
    private router:        Router,
    private configService: ConfigService,
    private http:          HttpClient,
    private authService:   AuthService,
    private generalService: AppUIUtilsService
  ) {
    this.configData = this.configService.getConfigData();
  }

  public EnterprisePostOK:Subject<any> = new Subject();
  public EnterprisePostKO:Subject<any> = new Subject();

  private configData:any = {};

  public getAllOK:Subject<any>           = new Subject();
  public getAllKO:Subject<any>           = new Subject();
  public updateTableSubject:Subject<any> = new Subject();

  private mainAction:string = 'locationsAction';

  private LastElement:any = {};
  getAll( params:any = ''){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ] + params,
      { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'Authorization':'Bearer ' + this.authService.getToken() }) }).subscribe(
        data => {
            this.LastElement = data;
            this.getAllOK.next(data);
        },
        err =>  {
            this.generalService.dismissLoading();
            this.getAllKO.next(err);
        }
      );
  }

  getMapPoints( params:any, mapPointConfig:MapPointConfig ){
    let out:MapPoint[] = [];

    for ( let c=0; c < params.length; c++){
      out.push( new MapPoint(
        { lat: params[ c ].latitude, lng: params[ c ].longitude },
        { draggable: false, label: String( params[ c ].id ) },
        { url:'./assets/circle1.png', scaledSize: { width:25, height:25 } }
      ) );
    }

    return out;
  }

  public getOK:Subject<any>           = new Subject();
  public getKO:Subject<any>           = new Subject();
  get( id:number, extraParams:string='' ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData[ this.mainAction ]+'/'+id+extraParams,
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
      out.push({ value: params.items[c].id, text:params.items[c].description });
    }
    return out;
  }

  public goToCreateSubj:Subject<any> = new Subject();
  goToCreate(){
    this.router.navigate( [ '/administracion' ] );
    this.goToCreateSubj.next(true);
  }

  public PostOK:Subject<any> = new Subject();
  public PostKO:Subject<any> = new Subject();
  post( model:Location ){
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

  public goToEditSubj:Subject<any> = new Subject();
  goToEdit( id:any ){
    this.router.navigate( [ '/administracion' ] );
    this.goToEditSubj.next( id );
  }

  public PutOK:Subject<any> = new Subject();
  public PutKO:Subject<any> = new Subject();
  put( model:Location ){
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

  public goToLocationSubj:Subject<any> = new Subject();
  goToLocationsAbm(){
    this.router.navigate( [ '/administracion' ] );
    this.goToLocationSubj.next(true);
  }
}
