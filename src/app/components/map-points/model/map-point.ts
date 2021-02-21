export class MapPoint{
    public markerOption: google.maps.MarkerOptions = {};
    public markerPosition:google.maps.LatLngLiteral = { lat:0, lng:0 };

    constructor ( markerPos:google.maps.LatLngLiteral, markerOps:google.maps.MarkerOptions, icon:any ){
      this.markerOption   = markerOps;
      this.markerPosition = markerPos;
      this.markerOption.icon = icon;
    }
}
