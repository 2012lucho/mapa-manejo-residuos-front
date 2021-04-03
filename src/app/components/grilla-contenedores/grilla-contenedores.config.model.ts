import { Subject }    from 'rxjs';
import { DashboardFinderParams } from '../dashboard-finder/models/dashboard.finder.params';

export class ConfigGrillaContenedores {
  public tableData:any = [];
  public highlightRow:Subject<number> = new Subject();
  public goToMarkerEvnt:Subject<any> = new Subject();

  public filterParams:DashboardFinderParams = new DashboardFinderParams();

  public style:any = {
    defaultBg: [ '#fff', '#eee' ],
  };
}
