define('meetup_event_embedder', [
  'jquery',
  'meetup',
  'meetup_map_embedder'
], function (
  $,
  Meetup,
  MeetupMapEmbedder
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
      sigId: 'TODO',
      sig: 'TODO'
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
    var evt = this._eventData(evtObj),
        html = _.template(this.template, { event: evt });

    this.container.html(html)
    this.embedMap(evt);
  };

  Embedder.prototype.embedMap = function (evtObj) {
    new MeetupMapEmbedder(evtObj);
  };

  Embedder.prototype.buildIframeMap = function (evt) {
    var iframeSrc = this._iframeSrc(evt);

    this.map.attr('src', iframeSrc);
  };

  Embedder.prototype._eventData = function (evt) {
    return {
      name: evt.name,
      venueName: evt.venue_name,
      url: this._url(evt),
      mapUrl: this._getMapUrl(evt),
      time: this._formattedTime(evt.time),
      address: this._formattedAddress(evt),
      description: evt.description,
    };
  };

  // WIP
  Embedder.prototype._iframeSrc = function (evt) {
    return 'https://www.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=' + this._locationQuery(evt) + '&amp;aq=0&amp;oq=' + this._locationOq(evt) + '&amp;sll=' + evt.lat + ',' + evt.lon + 'ie=UTF8&amp;hq=&amp;hnear=' + this._locationQuery(evt) + '&amp;ll=' + evt.lat + ',' + evt.lon + '&amp;spn=0.010111,0.023378&amp;t=m&amp;z=14&amp;output=embed';
  };

  Embedder.prototype._getMapUrl = function (evt) {
    var query = this._locationQuery(evt);

    return 'https://maps.google.com/?q=' + query + '&ll=' + evt.lat + ',' + evt.lon;
  };

  Embedder.prototype._locationQuery = function (evt) {
    var query = evt.venue_name + ',' + this._formattedAddress(evt) + '+' + evt.venu_zip;

    return query.replace(/\s/g, '+');
  };

  Embedder.prototype._formattedAddress = function (evt) {
    return evt.venue_address1 + ', ' + evt.venue_city + ', ' + evt.venue_state;
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
