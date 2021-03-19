import { Component, OnInit, Input, NgZone } from '@angular/core';

import {MapInfoWindow, MapMarker} from '@angular/google-maps';

import { MapPoint } from './model/map-point';
import { MapPointConfig } from './model/map.points.config';

@Component({
  selector: 'app-map-points',
  templateUrl: './map-points.component.html',
  styleUrls: ['./map-points.component.sass']
})
export class MapPointsComponent implements OnInit {

  constructor(
    private zone: NgZone
  ) { }

  public center:any  = { lat: -33.050721, lng: -71.602699 };
  public zoom:number = 15;
  display?: google.maps.LatLngLiteral;

  @Input() points:MapPoint[] = [];
  @Input() config:MapPointConfig = new MapPointConfig();

  public map:any=null;

  private updateMarkersSubs:any = null;
  private markers:google.maps.Marker[] = [];

  private mapGoToPointSubs:any = null;

  ngOnInit(): void {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: this.zoom,
        center: this.center,
      }
    );
    this.map = map;

    //subscripción a actualización de mapa
    this.updateMarkersSubs = this.config.updateMarkers.subscribe({  next: ( params: any ) => {
        this.updateMarkers( map );
    } });

    //subscripción para posicionar el centro del mapa en el punto especificado
    this.mapGoToPointSubs = this.config.mapGoToPoint.subscribe({  next: ( params: any ) => {
        this.goToPoint( params );
    } });

    this.config.updateMarkers.next( true );
  }

  goToPoint( params:any ){
    this.map.setCenter( params.cc );
    for ( let c=0; c < this.markers.length; c++ ){
      if (this.markers[ c ].getLabel() == params.id ){
        this.markers[ c ].setIcon( './assets/circle2.png' );
      } else {
        this.markers[ c ].setIcon( './assets/circle1.png' );
      }
    }
  }

  updateMarkers( map:google.maps.Map ){
    this.resetMarkers();
    for ( let c=0; c < this.points.length; c++ ){
      let marker = new google.maps.Marker({
        position: this.points[ c ].markerPosition,
        map,
        label: this.points[ c ].markerOption.label,
        draggable:  this.points[ c ].markerOption.draggable,
        icon: this.points[ c ].markerOption.icon
      });

      marker.addListener("click", () => {
        this.markerClickEvnt( this.points[ c ] );
      });


      this.markers.push( marker );
    }
  }

  resetMarkers(){
    for ( let c=0; c < this.markers.length; c++ ){
      this.markers[ c ].setMap( null );
    }
  }

  markerClickEvnt( point:any ){
    this.config.mapPointClick.next( point );
    this.goToPoint( { id: point.markerOption.label } );
  }

  ngOnDestroy(){
    this.updateMarkersSubs.unsubscribe();
    this.mapGoToPointSubs.unsubscribe();
  }

}
