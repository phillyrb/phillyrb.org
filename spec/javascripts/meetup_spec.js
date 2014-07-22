define('spec/javascripts/meetup_spec', [
  'source/javascripts/meetup'
], function (Meetup) {

  alert('inside meetup spec')

  describe("Meetup", function () {
    it("exists", function () {
      expect(Meetup).toBeDefined();
    });
  });
});
