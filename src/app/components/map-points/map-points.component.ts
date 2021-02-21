import { Component, OnInit } from '@angular/core';

import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { MapPoint } from './model/map-point';

@Component({
  selector: 'app-map-points',
  templateUrl: './map-points.component.html',
  styleUrls: ['./map-points.component.sass']
})
export class MapPointsComponent implements OnInit {

  constructor() { }

  public center:any  = { lat: -33.050721, lng: -71.602699 };
  public zoom:number = 15;
  display?: google.maps.LatLngLiteral;

  public points:MapPoint[] = [];

  ngOnInit(): void {

    this.points.push( new MapPoint(
      { lat: -33.050421, lng: -71.601699 },
      { draggable: false },
      { url:'./assets/cont2.png', scaledSize: { width:25, height:25 } }
    ) );

    this.points.push( new MapPoint(
        { lat: -33.058421, lng: -71.602699 },
        { draggable: false },
        { url:'./assets/cont3.png', scaledSize: { width:25, height:25 } }
    ) );

    this.points.push( new MapPoint(
        { lat: -33.052421, lng: -71.608699 },
        { draggable: false },
        { url:'./assets/cont4.png', scaledSize: { width:25, height:25 } }
    ) );

    this.points.push( new MapPoint(
        { lat: -33.057421, lng: -71.604699 },
        { draggable: false },
        { url:'./assets/cont1.png', scaledSize: { width:25, height:25 } }
    ) );

    this.points.push( new MapPoint(
        { lat: -33.050621, lng: -71.603699 },
        { draggable: false },
        { url:'./assets/cont2.png', scaledSize: { width:25, height:25 } }
    ) );

    this.points.push( new MapPoint(
        { lat: -33.050321, lng: -71.607699 },
        { draggable: false },
        { url:'./assets/cont2.png', scaledSize: { width:25, height:25 } }
    ) );

    this.points.push( new MapPoint(
        { lat: -33.058421, lng: -71.601699 },
        { draggable: false },
        { url:'./assets/cont3.png', scaledSize: { width:25, height:25 } }
    ) );


  }

}
