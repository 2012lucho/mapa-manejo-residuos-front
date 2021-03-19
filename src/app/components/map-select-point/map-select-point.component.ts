import { Component, OnInit, Input, NgZone } from '@angular/core';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { MapSelectModelConfig } from './model/map-select.model.config';

@Component({
  selector: 'app-map-select-point',
  templateUrl: './map-select-point.component.html',
  styleUrls: ['./map-select-point.component.sass']
})
export class MapSelectPointComponent implements OnInit {

  constructor(
    private zone: NgZone
  ) { }

  public zoom:number = 15;
  display?: google.maps.LatLngLiteral;

  public map:any=null;
  private marker:any = null;

  @Input() config:MapSelectModelConfig = new MapSelectModelConfig();

  ngOnInit(): void {
    //Esto de definir constante no me gusta pero la API de google es quisquillosa
    const map = new google.maps.Map(
      document.getElementById( 'map-select-point' ) as HTMLElement,
      {
        zoom: this.config.zoom,
        center: this.config.center,
      }
    );
    this.map = map;

    this.marker = new google.maps.Marker({
       position: this.config.center,
       map,
       draggable:  true
     });

     this.marker.addListener("mouseover", () => {
        this.config.markerMove.next( this.marker );
     });
     this.config.markerMove.next( this.marker );
  }
  
}
