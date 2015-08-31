describe("FurthestPage", function(){
  it("uses the closure to get the latest page", function() {
    var topicId = 10;
    var finder = function(){ return 4; }
    var furthestPage = new FurthestPage(topicId, finder)

    expect(furthestPage.page).to.equal(4)
  })

  it("persists the page in localStorage", function() {
    var topicId = 10;
    var finder = function(){ return 4; }
    var furthestPage = new FurthestPage(topicId, finder)

    expect(localStorage["thredded.furthestPage"]).to.equal('{"10":4}')
  });

  it("saves only the highest page number", function() {
    localStorage["thredded.furthestPage"] = '{"10":4}'

    var topicId = 10;
    var finder = function(){ return 3; }
    var furthestPage = new FurthestPage(topicId, finder)

    expect(localStorage["thredded.furthestPage"]).to.equal('{"10":4}')
  });
});
