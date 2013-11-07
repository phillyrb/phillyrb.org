define('meetup', [
  'jquery'
], function (
  $
) {
  var Meetup = function () {
    this.initialize();
  };

  Meetup.prototype.initialize = function (opts) {
    this.apiHost = 'http://api.meetup.com';
  };

  Meetup.prototype.events = function (opts) {
    var path = '/events.json?radius=25.0&order=time&group_urlname=phillyrb&offset=0&format=json&page=200&fields=&sig_id=REPLACE_ME&sig=REPLACE_ME';

    this._fetchData(path, opts);
  };

  Meetup.prototype._fetchData = function (path, opts) {
    $.ajax({
      url: this.apiHost + path,
      dataType: "jsonp",
      success: opts.success,
      error: function () {
        console.log('error');
      }
    });
  };

  return Meetup;
});
