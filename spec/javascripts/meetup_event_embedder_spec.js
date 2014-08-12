define('spec/javascripts/meetup_event_embedder_spec', [
  'meetup_event_embedder',
  'meetup'
], function (
  MeetupEventEmbedder,
  Meetup
) {

  describe('MeetupEventEmbedder', function () {
    var html,
        template,
        section;

    beforeEach(function () {
      template = [
          '<script type="text/html" id="event-tmpl">',
            '<h1>Fake Heading</h1>',
          '</script>'
      ].join(''),
      nextEvent = [
        '<section class="next-event">',
          '<article class="next-event-information"></div>',
        '</section>'
      ].join(''),
      html = [
        template,
        nextEvent
      ].join('');

      $('body').append(html);

      this.embedder = new MeetupEventEmbedder();
    });

    afterEach(function () {
      $('#event-tmpl').remove();
      $('.next-event').remove();
    });

    describe('#initialize', function () {
      it('sets a "template" property on the embedder instance', function () {
        expect(this.embedder.template).toEqual('<h1>Fake Heading</h1>');
      });

      it('sets a "root" property on the embedder instance', function () {
        expect(this.embedder.root).toEqual($('.next-event'));
      });

      it('sets a "container" property on the embedder instance', function () {
        expect(this.embedder.container).toEqual(this.embedder.root.find('article.next-event-information'));
      });

      it('sets a "meetup" property on the embedder instance', function () {
        expect(this.embedder.meetup instanceof Meetup).toEqual(true);
      });

      it('calls "#events" on its "meetup" instance', function () {
        spyOn(Meetup.prototype, 'events');

        this.embedder.initialize();

        expect(Meetup.prototype.events).toHaveBeenCalled();
      });

      describe('how it handles a successful events retrieval', function () {
        beforeEach(function () {
          spyOn(Meetup.prototype, 'events');
          spyOn(this.embedder, 'embed');
          spyOn(this.embedder.root, 'addClass');

          this.embedder.initialize();

          Meetup.prototype.events.mostRecentCall.args[0].success({
            results: [{
              foo: 'bar'
            }]
          });
        });

        it('embeds the event', function () {
          expect(this.embedder.embed).toHaveBeenCalled();
        });

        it('adds a "loaded" class to the root elem', function () {
          expect(this.embedder.root.hasClass('loaded')).toEqual(true);
        });
      });
    });
  });
});
