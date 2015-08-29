//= require_tree ./thredded_reads/vendor
//= require      ./thredded_reads/latest_post

class ThreddedReads {
  constructor(options){
    let default_options = {
      topicId: '',
      postsSelector: "[data-post-id]",
    }

    this.options = jQuery.extend({}, default_options, options);
    this.topicCompleted = false;
    this.latestPost = new LatestPost(this.options['topicId']);
  }

  track(){
    let postsSelector = this.options['postsSelector'];

    jQuery(postsSelector)
      .bind('inview', e => {
        this.latestPost.post = e.currentTarget.dataset['postId'];
      }.bind(this)
    )

    jQuery(window)
      .on('scroll', e => {
        console.log(`We need to send ${this.latestPost.post}`)
      }.bind(this), 3000);
  }
}
