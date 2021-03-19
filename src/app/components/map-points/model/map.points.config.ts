import { Subject }  from 'rxjs';

export class MapPointConfig{
  mapPointClick:Subject<any> = new Subject();
  updateMarkers:Subject<any> = new Subject();
  mapGoToPoint:Subject<any>  = new Subject();
}
