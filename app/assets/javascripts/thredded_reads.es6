//= require_tree ./thredded_reads/vendor

class ThreddedReads {
  constructor(options){
    let default_options = {
      topicId: '',
      postsSelector: "[data-post-id]",
    }

    this.latestPost = '';
    this.topicCompleted = false;
    this.options = jQuery.extend({}, default_options, options);
  }

  track(){
    let postsSelector = this.options['postsSelector'];

    jQuery(postsSelector)
      .bind('inview', e => {
        this.latestPost = e.currentTarget.dataset['postId'];
      }.bind(this)
    )
  }
}
