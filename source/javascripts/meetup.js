define('meetup', [
  'jquery'
], function (
  $
) {
  var Meetup = function (options) {
    this.initialize();
  };

  Meetup.prototype.initialize = function (opts) {
    this.apiKey = opts && opts.apiKey ? opts.apiKey : null;
    this.apiHost = 'https://api.meetup.com/2/'
  };

  Meetup.prototype.events = function (opts) {
    var url = 'events?&sign=true&group_urlname=phillyrb&page=20';

    this._fetchData(url, opts);
  };

  Meetup.prototype._fetchData = function (url, opts) {
    $.ajax({
      url: this.apiHost + url + '&key=' + this.apiKey,
      dataType : "jsonp",
      success: opts.success,
    });
  };

  return Meetup;
});
