import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { ReportFillLevelLocationConfig } from './report-fill-level-location/models/report.fill.level.location.config';

import { FormateoService }   from '../../services/formateo.service';

@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.sass']
})
export class MonitoreoComponent implements OnInit {

  public chartOptions:any  = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    series: [
        {
            name: 'Contenedores por Empresa',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'Empresa A'},
                {value: 735, name: 'Empresa B'},
                {value: 580, name: 'Empresa C'},
                {value: 484, name: 'Empresa D'},
                {value: 300, name: 'Empresa E'}
            ]
        }
    ]
  };

  public RPFLLConfig:ReportFillLevelLocationConfig = new ReportFillLevelLocationConfig();

  constructor(
    private route:           ActivatedRoute,
    private formateoService: FormateoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if ( params.hasOwnProperty( 'graph' ) ){
        if ( params.graph == 'location-f-level'){
          this.RPFLLConfig.filterParams.location_id = params.location;
          this.RPFLLConfig.filterParams.byn_id      = params.byn_id;
          this.RPFLLConfig.filterParams.date_end    = params.date_end;
          this.RPFLLConfig.filterParams.date_start  = params.date_start;
          this.RPFLLConfig.updateGraph.next( true );
        }
      }
    });
  }


}
