define('meetup_spec', [
  'meetup'
], function (
  Meetup
) {

  alert('inside meetup spec')

  describe("Meetup", function () {
    it("exists", function () {
      expect(Meetup).toBeDefined();
    });
  });
});
