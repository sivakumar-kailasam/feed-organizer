import Ember from 'ember';
import layout from '../templates/components/feed-card';


export default Ember.Component.extend({

	layout: layout,

	classNames: ['feed-card', 'z-depth-1', 'draggable-item'],

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