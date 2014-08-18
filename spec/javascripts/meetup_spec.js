define('spec/javascripts/meetup_spec', [
  'meetup'
], function (Meetup) {

  describe('Meetup', function () {
    beforeEach(function () {
      this.meetup = new Meetup();
    });

    describe('.apiHost', function () {
      it('is properly set on each meetup instance', function () {
        expect(this.meetup.apiHost).toEqual('http://api.meetup.com');
      });
    });

    describe('#events', function () {
      it('calls #_fetchData with the proper arguments', function () {
        var opts = { foo: 'bar' },
            path = '/2/events?status=upcoming&order=time&limited_events=False&group_urlname=phillyrb&desc=false&offset=0&format=json&page=20&fields=&sig_id=11822953&sig=8670ef3ef7ba48751cd01123b613f42576c444c1';

        spyOn(this.meetup, '_fetchData');

        this.meetup.events(opts);

        expect(this.meetup._fetchData).toHaveBeenCalledWith(path, opts);
      });
    });

    describe('_fetchData', function () {
      beforeEach(function () {
        spyOn($, 'ajax');
        spyOn(console, 'log');

        this.meetup._fetchData('/path', {
          success: 'foo'
        });
      });

      it('performas a jQuery ajax call', function () {
        expect($.ajax).toHaveBeenCalled();
      });

      describe('the ajax call it makes', function () {
        it('makes a request to the proper URL', function () {
          expect($.ajax.mostRecentCall.args[0].url).toEqual('http://api.meetup.com/path');
        });

        it('makes a JSONP call', function () {
          expect($.ajax.mostRecentCall.args[0].dataType).toEqual('jsonp');
        });

        it('passes along the proper success callback', function () {
          expect($.ajax.mostRecentCall.args[0].success).toEqual('foo');
        });

        describe('when the ajax error fails', function () {
          it('logs the error', function () {
            $.ajax.mostRecentCall.args[0].error('error');

            expect(console.log).toHaveBeenCalledWith('error');
          });
        });
      });
    });
  });
});
