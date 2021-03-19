import { Subject }  from 'rxjs';

export class MapSelectModelConfig{
    public center:any              = { lat: -33.050721, lng: -71.602699 };
    public zoom:number             = 15;
    public markerMove:Subject<any> = new Subject();
}
