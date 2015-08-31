describe("FurthestPost", function() {
  var topicId = "3";
  var latest  = new FurthestPost(topicId);

  afterEach(function(){
    latest.reset();
  });

  it("saves highest number posts", function() {
    latest.post = "10";
    latest.post = "2"

    expect(latest.post).to.equal(10);
  });

  it("persists in localStorage", function() {
    latest.post = 10;

    expect(localStorage["thredded.furthestPost"]).to.equal('{"3":10}');
  });

  it("saves more than one topic's history", function() {
    topicOne = new FurthestPost("5");
    topicTwo = new FurthestPost("6");

    topicOne.post = 23;
    topicTwo.post = 47;

    expect(localStorage["thredded.furthestPost"]).to.equal('{"5":23,"6":47}')
  });
});

