define('spec/javascripts/app_spec', [
  'app',
  'meetup_event_embedder'
], function (
  App,
  MeetupEventEmbedder
) {

  describe('App', function () {
    beforeEach(function () {
      this.app = new App();
    });

    describe('#initialize', function () {
      beforeEach(function () {
        spyOn(this.app, '_configureUnderscore');
        spyOn(this.app, '_embedMeetup');

        this.app.initialize();
      });

      it('calls #_configureUnderscore', function () {
        expect(this.app._configureUnderscore).toHaveBeenCalled();
      });

      it('calls #_embedMeetup', function () {
        expect(this.app._configureUnderscore).toHaveBeenCalled();
      });
    });

    describe('#_embedMeetup', function () {
      it('instantiates a new MeetupEventEmbedder', function () {
        spyOn(MeetupEventEmbedder.prototype, 'initialize');

        this.app._embedMeetup();

        expect(MeetupEventEmbedder.prototype.initialize).toHaveBeenCalled();
      });
    });

    describe('#_configureUnderscore', function () {
      beforeEach(function () {
        this.app._configureUnderscore();
      });

      it('sets the proper template evaluate settings on underscore', function () {
        expect(_.templateSettings.evaluate).toEqual(/\{\[([\s\S]+?)\]\}/g);
      });

      it('sets the proper template interpolate settings on underscore', function () {
        expect(_.templateSettings.interpolate).toEqual(/\{\{([\s\S]+?)\}\}/g);
      });
    });
  });
});
