import { Component, OnInit } from '@angular/core';


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

  public chartOptions2:any  = {
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

  constructor() { }

  ngOnInit(): void {
  }


}
