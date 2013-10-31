define('app', [
  'meetup_event_embedder'
], function (
  MeetupEventEmbedder
) {

  var App = function () {
    this.initialize();
  };

  App.prototype.initialize = function () {
    this._configureUnderscore();
    this._embedMeetup();
  };

  App.prototype._embedMeetup = function () {
    new MeetupEventEmbedder();
  };

  App.prototype._configureUnderscore = function () {
    _.templateSettings = {
      evaluate : /\{\[([\s\S]+?)\]\}/g,
      interpolate : /\{\{([\s\S]+?)\}\}/g
    };
  };

  return App;
});
