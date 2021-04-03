import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(
  ) {}

  public getConfigData(){
    return {
      apiBaseUrl:"http://dashboard.lymp.io/api/web/",
      loginAction:"login",
      enterpriseAction:"enterprises",
      bynTypeAction:"byn-types",
      sensorsAction:"sensors",
      usersAction:"users",
      bynsAction:"byns",
      sensorupdatesAction:"sensor-updates",
      fillLevelAction: "fill-levels",
      locationsAction: "locations",
      appName: "lympio_prod_"
    };
  }

}
