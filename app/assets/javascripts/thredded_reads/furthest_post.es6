class FurthestPost {
  constructor(topicId) {
    this._init_localstorage();
    this.topicId = topicId.toString();
    this.postId = JSON.parse(
        localStorage["thredded.furthestPost"]
      )[this.topicId];
  }

  get post() {
    return this.postId;
  }

  set post(p) {
    var hstore = JSON.parse(localStorage["thredded.furthestPost"]);

    if(this.postId === undefined || parseInt(p) > this.postId) {
      this.postId = hstore[this.topicId] = parseInt(p);
      localStorage["thredded.furthestPost"] = JSON.stringify(hstore);
    }
  }

  reset() {
    this.postId = undefined;
    localStorage["thredded.furthestPost"] = "{}";
  }

  // private

  _init_localstorage() {
    if(localStorage["thredded.furthestPost"] == "" ||
        localStorage["thredded.furthestPost"] === undefined) {
      localStorage["thredded.furthestPost"] = "{}";
    }
  }
}

