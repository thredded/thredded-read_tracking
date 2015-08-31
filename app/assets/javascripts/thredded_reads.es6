//= require_tree ./thredded_reads/vendor
//= require      ./thredded_reads/furthest_post
//= require      ./thredded_reads/furthest_page
//= require      ./thredded_reads/done_reading

class ThreddedReads {
  constructor(options) {
    let default_options = {
      topicId: '',
      postsSelector: "[data-post-id]",
      lastPostSelector: "[data-post-id]:last",
      isFinished: this.isFinished,
      pageFinder: this.pageFinder,
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
        if(this.isChanged()) {
          console.log(
            `
            We are at post ${this.furthestPost.post}
            on page ${this.furthestPage.page}
            and are we finished? ${this.doneReading.done}
            `
          )
        }
      }.bind(this), 1500);
  }

  pageFinder() {
    let pageNum = jQuery('.page.current').text() || '1'

    return parseInt(pageNum);
  }

  isFinished() {
    return(jQuery('.pagination span.last').length == 0);
  }

  isChanged() {
    return(
      this.doneReading.isChanged() ||
      this.furthestPost.isChanged() ||
      this.furthestPage.isChanged()
    )
  }
}
