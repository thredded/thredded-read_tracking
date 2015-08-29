describe("LatestPost", function() {
  var topicId = "3"
  var latest  = new LatestPost(topicId);

  beforeEach(function(){
    latest.reset();
  });

  it("saves highest number posts", function() {
    latest.post = "10";
    latest.post = "2"

    expect(latest.post).to.equal(10);
  });

  it("persists in localStorage", function() {
    latest.post = 10;

    expect(localStorage["thredded.reads"]).to.equal('{"3":10}');
  });

  it("saves more than one topic's history", function() {
    topicOne = new LatestPost("5");
    topicTwo = new LatestPost("6");

    topicOne.post = 23;
    topicTwo.post = 47;

    expect(localStorage["thredded.reads"]).to.equal('{"5":23,"6":47}')
  });
});

