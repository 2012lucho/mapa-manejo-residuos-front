import { Component, OnInit, Input } from '@angular/core';

import { DashboardFinderConfigModel } from './dashboard-finder.config.model';

@Component({
  selector: 'app-dashboard-finder',
  templateUrl: './dashboard-finder.component.html',
  styleUrls: ['./dashboard-finder.component.sass']
})
export class DashboardFinderComponent implements OnInit {

  @Input() filterListConfig:DashboardFinderConfigModel = new DashboardFinderConfigModel();

  constructor() { }

  ngOnInit(): void {
  }

}
