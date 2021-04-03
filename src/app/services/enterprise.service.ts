import { Injectable      } from '@angular/core';
import { Subject }         from 'rxjs';
import { Router }          from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfigService }   from './config.service';
import { AuthService }     from './auth/auth.service';
import { AppUIUtilsService }     from './app.ui.utils.service';

import { Enterprise }  from '../models/enterprise';

@Injectable({ providedIn: 'root' })
export class EnterpriseService {

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

  private LastElement:any = {};
  getAllEnterpriseData( params:any ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData['enterpriseAction'],
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

  public getOK:Subject<any>           = new Subject();
  public getKO:Subject<any>           = new Subject();
  get( id:number ){
    this.http.get( this.configData['apiBaseUrl'] + this.configData['enterpriseAction']+'/'+id,
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
      out.push({ value: params.items[c].id, text:params.items[c].name });
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
  post( model:Enterprise ){
    this.http.post( this.configData['apiBaseUrl'] + this.configData['enterpriseAction'], model,
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
  put( model:Enterprise ){
    this.http.put( this.configData['apiBaseUrl'] + this.configData['enterpriseAction']+'/'+model.id, model,
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

  public goToEnterpriseSubj:Subject<any> = new Subject();
  goToEnterpriseAbm(){
    this.router.navigate( [ '/administracion', { subPage:'empresas' } ] );
    this.goToEnterpriseSubj.next(true);
  }
}
