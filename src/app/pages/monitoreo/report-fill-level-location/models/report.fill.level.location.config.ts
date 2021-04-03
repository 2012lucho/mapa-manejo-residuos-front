import { Subject }    from 'rxjs';

export class ReportFillLevelLocationParams {
  public location_id:number = 0;
  public byn_id:number = 0;
  public date_start:any = 0;
  public date_end:any = 0;
}

export class ReportFillLevelLocationConfig {
  public filterParams:ReportFillLevelLocationParams = new ReportFillLevelLocationParams();
  public updateGraph:Subject<any> = new Subject();
}
