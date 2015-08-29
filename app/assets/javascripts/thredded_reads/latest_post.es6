class LatestPost {
  constructor(topicId) {
    this._init_localstorage();
    this.topicId = topicId.toString();
    this.postId = JSON.parse(localStorage["thredded.reads"])[this.topicId];
  }

  get post(){
    return this.postId;
  }

  set post(p){
    var hstore = JSON.parse(localStorage["thredded.reads"]);

    if(this.postId === undefined || parseInt(p) > this.postId){
      this.postId = hstore[this.topicId] = parseInt(p);
      localStorage["thredded.reads"] = JSON.stringify(hstore);
    }
  }

  reset() {
    this.postId = undefined;
    localStorage["thredded.reads"] = "{}";
  }

  // private

  _init_localstorage(){
    if(localStorage["thredded.reads"] == "") {
      localStorage["thredded.reads"] = "{}";
    }
  }
}

