import { Component, OnInit, Input } from '@angular/core';
import { Subject }           from 'rxjs';
import { Router }          from '@angular/router';

import { ReciclerBynService } from '../../services/recicler.byn.service';
import { ConfigGrillaContenedores } from './grilla-contenedores.config.model';

@Component({
  selector: 'app-grilla-contenedores',
  templateUrl: './grilla-contenedores.component.html',
  styleUrls: ['./grilla-contenedores.component.sass']
})
export class GrillaContenedoresComponent implements OnInit {

  @Input() tableConfig:ConfigGrillaContenedores = new ConfigGrillaContenedores();

  private highlightRowSubj:any = null;
  private rowhighlighted:number = 0;

  constructor(
    private reciclerBynService: ReciclerBynService,
    private router:             Router
  ) { }

  public updateTable:Subject<boolean> = new Subject();

  getLimitedData( data:any, count:number = 1 ){
    let out:any = [];
    let d_l:number =data.length;
    for ( let c=0; c < count; c++){
      if (c<d_l){
        out.push(data[c]);
      } else {
        out.push(null);
      }
    }
    return out;
  }

  ngOnInit(): void {
    this.highlightRowSubj = this.tableConfig.highlightRow.subscribe({  next: ( params: number ) => {
      this.highlightRow( params );
    } });
  }

  goToMarker( reg:any ){
    this.tableConfig.goToMarkerEvnt.next( reg );
    this.highlightRow( reg.id );
  }

  goToGraph( reg:any, subReg:any = -1 ){
    this.router.navigate( [ '/monitoreo',
    {
      graph:      'location-f-level',
      location:   reg.id,
      byn_id:     subReg,
      date_end:   this.tableConfig.filterParams.date_end,
      date_start: this.tableConfig.filterParams.date_start,
    }]);
  }

  highlightRow( id:number ){
    this.rowhighlighted = id;
  }

  getRowBgColor( id:number ){
    if ( id == this.rowhighlighted ){
      return '#d3f3ff';
    }

    return this.tableConfig.style.defaultBg[ id % 2 ];
  }

  ngOnDestroy(){
    this.highlightRowSubj.unsubscribe();
  }

  goToBinAbm(){
    this.reciclerBynService.goToAbm();
  }

}
