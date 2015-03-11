import Ember from 'ember';
import layout from '../templates/components/feed-card';


export default Ember.Component.extend({

	layout: layout,

	classNames: ['feed-card', 'z-depth-1', 'draggable-item'],

	classNameBindings: ['uncategorized'],

	uncategorized: function() {
		return Ember.isBlank(this.get('feed.collection'));
	}.property('feed.collection'),

	attributeBindings: ['draggable'],

	draggable: true,

	dragStart: function(event) {
		return event.dataTransfer.setData('text/data', this.get('feed.id'));
	},

	actions: {

		deleteFeed: function() {
			this.sendAction('action', this.get('feed'));
		}

	}

});