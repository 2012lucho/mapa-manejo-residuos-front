import { Component, OnInit, Input } from '@angular/core';

import { BootstrapFormConfig, ButtonBootstrapFormConfig, FieldBootstrapFormConfig } from '../../../components/bootstrap-form/model/bootstrap-form-config';
import { BootstrapFormRequired, BootstrapFormNumber, BootstrapFormDate } from '../../../components/bootstrap-form/bootstrap-form-validators';
import { ReportFillLevelLocationConfig } from './models/report.fill.level.location.config';

import { AppUIUtilsService }      from '../../../services/app.ui.utils.service';
import { FormateoService }        from '../../../services/formateo.service';
import { LocationsService }       from '../../../services/locations.service';
import { FillLevelService }       from '../../../services/fill.level.service';

@Component({
  selector: 'app-report-fill-level-location',
  templateUrl: './report-fill-level-location.component.html',
  styleUrls: ['./report-fill-level-location.component.sass']
})
export class ReportFillLevelLocationComponent implements OnInit {

  public formConfig:BootstrapFormConfig = new BootstrapFormConfig();

  public fillLevel:any  = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['Cartón', 'Metal', 'Plástico', 'Vidrio', 'Uso General']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'Cartón',
            type: 'line',
            stack: '总量',
            data: [30, 20, 40, 36, 20, 10, 21]
        },
        {
            name: 'Metal',
            type: 'line',
            stack: '总量',
            data: [5, 1, 6, 10, 9, 7, 15]
        },
        {
            name: 'Plástico',
            type: 'line',
            stack: '总量',
            data: [25, 25, 25, 30, 31, 32, 20]
        },
        {
            name: 'Vidrio',
            type: 'line',
            stack: '总量',
            data: [24, 26, 27, 28, 29, 30, 19]
        },
        {
            name: 'Uso General',
            type: 'line',
            stack: '总量',
            data: [80, 80, 70, 60, 50, 90, 85]
        }
    ]
};
  private applyFilters:any = null;
  private applyFiltersClick:any = null;
  private updateGraph:any = null;
  private getOk:any = null;
  @Input() config:ReportFillLevelLocationConfig = new ReportFillLevelLocationConfig();

  constructor(
    private appUIUtilsService: AppUIUtilsService,
    private formateoService:   FormateoService,
    private locationsService:  LocationsService,
    private fillLevelService:  FillLevelService
  ) { }

  ngOnInit(): void {
    this.setConfig();
  }

  setConfig(){
    this.formConfig.clearFields();
    this.formConfig.setTitle( '' );
    this.formConfig.model = this.config.filterParams;
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Ubicación:', field: 'location_id', type: 'select',
        originDataSubject:this.locationsService.getAllOK, provider: this.locationsService, getDataFunction:'getAll'
      } ) );
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Fecha Inicial:', field: 'date_start', type: 'date',
        validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } ),
        formatFunction:  ( i:any ) => { return this.formateoService.getTimeStampFDateStr(i); }
      } ) );
    this.formConfig.AddElement( new FieldBootstrapFormConfig(
      { title:'Fecha Final:', field: 'date_end', type: 'date',
        validator: new BootstrapFormRequired( { extraValidator: new BootstrapFormDate({ max: new Date() }) } ),
        formatFunction:  ( i:any ) => { return this.formateoService.getTimeStampFDateStr(i); }
      } ) );

    this.applyFilters = new ButtonBootstrapFormConfig( { title:'Aplicar', type: 'button' } );
    this.formConfig.AddElement( this.applyFilters );

    if (this.applyFiltersClick !== null){ this.applyFiltersClick.unsubscribe(); }
    this.applyFiltersClick = this.applyFilters.onClick.subscribe({  next: ( params: any ) => {
      this.config.updateGraph.next();
    } });

    this.formConfig.setFormLayount('in-line');

    this.updateGraph = this.config.updateGraph.subscribe({  next: ( params: any ) => {
      let extraParams:string = '?filter[byn_id]='+this.config.filterParams.byn_id+'&expand=byn,byn.byn_type';
      this.fillLevelService.getAllFillLevelData(extraParams);
    } });

    this.getOk = this.fillLevelService.getOK.subscribe({  next: ( params: any ) => {
      console.log(params);
    } });
  }

  ngOnDestroy(){
    if (this.applyFiltersClick !== null){ this.applyFiltersClick.unsubscribe(); }
    this.updateGraph.unsubscribe();
    this.getOk.unsubscribe();
  }
}
