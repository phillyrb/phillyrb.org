define('meetup_map_embedder', [
  'jquery'
], function (
  $
) {
  var Map = function (event) {
    this.initialize(event);
  };

  Map.prototype.initialize = function (event) {
    this.event = event;
    this.geocoder = new google.maps.Geocoder();
    this.geocodeAndMap(this.event.address);
  };

  Map.prototype.geocodeAndMap = function (address) {
    var self = this;

    self.geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        self.location = results[0].geometry.location;
        self._createMap();
      }
    });
  };

  Map.prototype._createMap = function () {
    var settings = {
      mapId: 'map',
      zoom: 14,
      center: this.location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById(settings.mapId), settings);
    this._addMarker();
    this._addInfoWindow();
  };

  Map.prototype._addMarker = function () {
    this.marker = new google.maps.Marker({
      position: this.location,
      map: this.map,
      title: this.event.venueName
    });
  };

  Map.prototype._addInfoWindow = function () {
    this.infoWindow = new google.maps.InfoWindow({
      content: this._infoWindowContent()
    });

    this.infoWindow.open(this.map, this.marker);
  };

  Map.prototype._infoWindowContent = function () {
    var template = $('#event-map-tmpl').html();

    return _.template(template, { event: this.event });
  };

  return Map;
});
