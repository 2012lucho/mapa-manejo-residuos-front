import { Subject }    from 'rxjs';

export class ConfigGrillaContenedores {
  public tableData:any = [];
  public highlightRow:Subject<number> = new Subject();
  public goToMarkerEvnt:Subject<any> = new Subject();
}
