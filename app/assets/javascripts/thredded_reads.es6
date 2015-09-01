//= require_tree ./thredded_reads/vendor
//= require      ./thredded_reads/furthest_post
//= require      ./thredded_reads/furthest_page
//= require      ./thredded_reads/done_reading

class ThreddedReads {
  constructor(options) {
    let default_options = {
      url: '',
      topicId: '',
      postsSelector: "[data-post-id]",
      lastPostSelector: "[data-post-id]:last",
      isFinished: this._isFinished,
      pageFinder: this._pageFinder,
    }

    this.options        = jQuery.extend({}, default_options, options);
    this.doneReading    = new DoneReading(this.options['topicId'])
    this.furthestPost   = new FurthestPost(this.options['topicId']);
    this.furthestPage   = new FurthestPage(
        this.options['topicId'],
        this.options['pageFinder']
      );
  }

  track() {
    let postsSelector    = this.options['postsSelector'];
    let lastPostSelector = this.options['lastPostSelector'];
    let isFinished       = this.options['isFinished'];

    jQuery(postsSelector)
      .bind('inview', e => {
        this.furthestPost.post = e.currentTarget.dataset['postId'];
      }.bind(this)
    )

    jQuery(lastPostSelector)
      .bind('inview', e => {
        if(!this.doneReading.done && isFinished()) {
          this.doneReading.finish();
        }
      }.bind(this)
    )

    jQuery(window)
      .on('scroll', e => {
        if(this._isChanged()) {
          console.log(
            `
            We are at post ${this.furthestPost.post}
            on page ${this.furthestPage.page}
            and are we finished? ${this.doneReading.done}
            `
          )

          jQuery.ajax({
            type: "PUT",
            url: this.options['url'],
            data: this._readData(),
            success: data => {},
            error: data => {},
          })
        }
      }.bind(this), 1500);
  }

  // private

  _pageFinder() {
    let pageNum = jQuery('.page.current').text() || '1'

    return parseInt(pageNum);
  }

  _isFinished() {
    return(jQuery('.pagination span.last').length == 0);
  }

  _isChanged() {
    return(
      this.doneReading.isChanged() ||
      this.furthestPost.isChanged() ||
      this.furthestPage.isChanged()
    )
  }

  _readData() {
    return {
      topic_read: {
        topic_id: this.options["topicId"],
        furthest_post: this.furthestPost.post,
        furthest_page: this.furthestPage.page,
        done_reading: this.doneReading.done,
      }
    }
  }
}
