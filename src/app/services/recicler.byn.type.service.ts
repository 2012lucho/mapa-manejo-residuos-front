import { Injectable      } from '@angular/core';
import { Subject }         from 'rxjs';
import { Router }          from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppUIUtilsService }    from './app.ui.utils.service';
import { ConfigService }   from './config.service';
import { AuthService }     from './auth/auth.service';

import { BynType }  from '../models/byn.type';

@Injectable({ providedIn: 'root' })
export class ReciclerBynTypeService {

  private configData:any = {};
  constructor(
    private router:           Router,
    private generalService:   AppUIUtilsService,
    private configService:    ConfigService,
    private authService:      AuthService,
    private http:             HttpClient,
  ) {
      this.configData = this.configService.getConfigData();
  }

  public getAllOK:Subject<any>           = new Subject();
  public getAllKO:Subject<any>           = new Subject();
  public updateTableSubject:Subject<any> = new Subject();

  public LastElement:any = null;

  getAllTypeBynData( params:any ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData['bynTypeAction'],
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

  public getOK:Subject<any> = new Subject();
  public getKO:Subject<any> = new Subject();
  get( id:number ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData['bynTypeAction'] + '/'+id,
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
  post( model:BynType ){
    this.http.post( this.configData['apiBaseUrl'] + this.configData['bynTypeAction'], model,
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

  public goToReciclerBynTypeSubj:Subject<any> = new Subject();
  goToReciclerBynTypeAbm(){
    this.router.navigate( [ '/administracion', { subPage:'tipo-cont' } ] );
    this.goToReciclerBynTypeSubj.next(true);
  }

  public goToEditSubj:Subject<any> = new Subject();
  goToEdit( id:number ){
    this.router.navigate( [ '/administracion' ] );
    this.goToEditSubj.next( id );
  }

  public PutOK:Subject<any> = new Subject();
  public PutKO:Subject<any> = new Subject();
  put( model:BynType ){
    this.http.put( this.configData['apiBaseUrl'] + this.configData['bynTypeAction']+'/'+model.id, model,
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
