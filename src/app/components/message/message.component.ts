import { Component, OnInit, Input } from '@angular/core';

import { AppUIUtilsService }   from '../../services/app.ui.utils.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  public buttonsClass:string = 'btn-outline-info';

  constructor(
    public gral:  AppUIUtilsService
  ) { }

  ngOnInit() {
  }

  dismiss(){
    this.gral.messageShow = false;
  }

}
