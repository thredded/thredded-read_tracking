class FurthestPage {
  constructor(topicId, finder){
    this.topicId = topicId;
    this._init_localstorage();
    var hstore = JSON.parse(localStorage["thredded.furthestPage"]);

    if(hstore[this.topicId] === undefined ||
        parseInt(finder()) > parseInt(hstore[this.topicId])) {

      this.pageNum = hstore[this.topicId] = parseInt(finder());
      localStorage["thredded.furthestPage"] = JSON.stringify(hstore);

    } else {
      this.pageNum = hstore[this.topicId];
    }
  }

  get page() {
    return this.pageNum;
  }

  // private

  _init_localstorage(){
    if(localStorage["thredded.furthestPage"] == "" ||
        localStorage["thredded.furthestPage"] === undefined) {
      localStorage["thredded.furthestPage"] = "{}";
    }
  }
}
