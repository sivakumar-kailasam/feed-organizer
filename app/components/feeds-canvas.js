import Ember from 'ember';
import layout from '../templates/components/feeds-canvas';


export default Ember.Component.extend({

	layout: layout,

	tagName: 'section',

	classNames: ['feed-area'],

	adjustHeight: function() {

		this.$().height(Ember.$(window).height());

	}.on('didInsertElement'),

	actions: {

		passDeleteFeedRequest: function(feed) {
			this.sendAction('deleteFeed', feed);
		}

	}

});