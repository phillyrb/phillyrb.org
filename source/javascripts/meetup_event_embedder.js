define('meetup_event_embedder', [
  'jquery',
  'meetup'
], function (
  $,
  Meetup
) {
  var Embedder = function () {
    this.initialize();
  };

  Embedder.prototype.initialize = function (evtObj) {
    var self = this;

    self.template = $('#event-tmpl').html();
    self.container = $('article.next-event-information');
    self.map = $('.next-event-map').find('iframe');
    self.meetup = new Meetup({
      apiKey: 'ADD ME'
    });
    self.meetup.events({
      success: function (data) {
        if (data && data.results) {
          self.embed(data.results[0]);
        }
      }
    });
  };

  Embedder.prototype.embed = function (evtObj) {
    var html = _.template(this.template, { event: this._eventData(evtObj) }),
        iframeSrc = this._iframeSrc(evtObj.venue);

    this.container.html(html)
    //this.map.attr('src', iframeSrc);
  };

  Embedder.prototype._eventData = function (evt) {
    return {
      name: evt.name,
      venueName: evt.venue.name,
      url: this._url(evt),
      mapUrl: this._getMapUrl(evt.venue),
      time: this._formattedTime(evt.time),
      address: this._formattedAddress(evt.venue),
      description: evt.description
    };
  };

  // WIP
  Embedder.prototype._iframeSrc = function (venue) {
    return 'https://www.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=' + this._locationQuery(venue) + '&amp;aq=0&amp;oq=' + this._locationOq(venue) + '&amp;sll=' + venue.lat + ',' + venue.lon + 'ie=UTF8&amp;hq=&amp;hnear=' + this._locationQuery(venue) + '&amp;ll=' + venue.lat + ',' + venue.lon + '&amp;spn=0.010111,0.023378&amp;t=m&amp;z=14&amp;output=embed';
  };

  Embedder.prototype._getMapUrl = function (venue) {
    var query = this._locationQuery(venue);

    return 'https://maps.google.com/?q=' + query + '&ll=' + venue.lat + ',' + venue.lon;
  };

  Embedder.prototype._locationQuery = function (venue) {
    var query = venue.name + ',' + this._formattedAddress(venue) + '+' + venue.zip;

    return query.replace(/\s/g, '+');
  };

  Embedder.prototype._formattedAddress = function (venue) {
    return venue.address_1 + ', ' + venue.city + ', ' + venue.state;
  };

  Embedder.prototype._formattedTime = function (time) {
    return moment(time).format('dddd, MMM Do, h:mm a');
  };

  Embedder.prototype._url = function (evt) {
    return 'http://meetup.com/Phillyrb/events/' + evt.id + '/';
  };

  Embedder.prototype._locationOq = function (venue) {
    var oq = venue.name + ' ' + venue.city.replace(/\s/g, '+');
    return oq.replace(/\s/g, '+').toLowerCase();
  };

  return Embedder;
});
