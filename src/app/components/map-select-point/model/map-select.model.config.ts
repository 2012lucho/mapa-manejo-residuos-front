import { Subject }  from 'rxjs';

export class MapSelectModelConfig{
    public center:any              = { lat: -33.050721, lng: -71.602699 };
    public zoom:number             = 15;
    public markerMove:Subject<any> = new Subject();

    public setCordsSubj:Subject<any> = new Subject();
    setCords( lat:number, lng:number){
      this.center.lat = lat;
      this.center.lng = lng;
      this.setCordsSubj.next( this.center );
    }
}
