import { Component, OnInit, Input } from '@angular/core';
import { Subject }           from 'rxjs';

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
    private reciclerBynService: ReciclerBynService
  ) { }

  public updateTable:Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.highlightRowSubj = this.tableConfig.highlightRow.subscribe({  next: ( params: number ) => {
      this.highlightRow( params );
    } });
  }

  goToMarker( reg:any ){
    this.tableConfig.goToMarkerEvnt.next( reg );
    this.highlightRow( reg.id );
  }

  highlightRow( id:number ){
    this.rowhighlighted = id;
  }

  getRowBgColor( id:number ){
    if ( id == this.rowhighlighted ){
      return '#d3f3ff';
    }

    return '#fff';
  }

  ngOnDestroy(){
    this.highlightRowSubj.unsubscribe();
  }

}
