define('meetup', [], function () {
  var Meetup = function () {
    this.initialize();
  };

  Meetup.prototype.initialize = function (opts) {
    this.apiHost = 'http://api.meetup.com';
  };

  Meetup.prototype.events = function (opts) {
    var path = '/2/events?status=upcoming&order=time&limited_events=False&group_urlname=phillyrb&desc=false&offset=0&format=json&page=20&fields=&sig_id=11822953&sig=8670ef3ef7ba48751cd01123b613f42576c444c1';

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
