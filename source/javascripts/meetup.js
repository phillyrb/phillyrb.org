define('meetup', [
  'jquery'
], function (
  $
) {
  var Meetup = function (options) {
    this.initialize(options);
  };

  Meetup.prototype.initialize = function (opts) {
    this.sigId = opts && opts.sigId ? opts.sigId : null;
    this.sig = opts && opts.sig ? opts.sig : null;
    this.apiHost = 'http://api.meetup.com/';
  };

  Meetup.prototype.events = function (opts) {
    var path = 'events.json?radius=25.0&order=time&group_urlname=phillyrb&offset=0&format=json&page=200';

    this._fetchData(path, opts);
  };

  Meetup.prototype._fetchData = function (path, opts) {
    $.ajax({
      url: this.apiHost + path + '&fields=&sig_id=' + this.sigId + '&sig=' + this.sig,
      dataType: "jsonp",
      success: opts.success,
      error: function () {
        console.log('error');
      }
    });
  };

  return Meetup;
});
