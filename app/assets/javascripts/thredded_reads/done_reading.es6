class DoneReading {
  constructor(topicId) {
    this.topicId = topicId.toString();
    this._init_localstorage();
    this.topicDone = JSON.parse(
        localStorage["thredded.finishedTopic"]
      )[this.topicId];
  }

  get done() {
    return this.topicDone;
  }

  finish() {
    var hstore = JSON.parse(localStorage["thredded.finishedTopic"]);
    this.topicDone = hstore[this.topicId] = true;
    localStorage["thredded.finishedTopic"] = JSON.stringify(hstore);
  }

  // private

  _init_localstorage() {
    if(localStorage["thredded.finishedTopic"] == "" ||
        localStorage["thredded.finishedTopic"] === undefined) {
      localStorage["thredded.finishedTopic"] = '{"'+ this.topicId +'":false}';
    }
  }
}
