import Ember from 'ember';
import layout from '../templates/components/collection-canvas';

export default Ember.Component.extend({


	tagName: 'section',


	layout: layout,


	classNames: ['collections-area'],


	widthPercentToSet: 30,



	adjustHeight: function() {

		this.$().height(Ember.$(window).height());

	}.on('didInsertElement'),


	actions: {

		filterFeedsByCollectionName: function(collectionId) {
			this.sendAction('filterCollectionName', collectionId);
		},

		addFeedToCollection: function(feedId, collectionId) {
			this.sendAction('addFeedToCollection', feedId, collectionId);
		},

		passRenameAction: function(collection) {
			this.sendAction('renameAction', collection);
		},

		toggleCollectionVisibility: function(collection) {
			this.sendAction('toggleCollectionVisibility', collection);
		}

	}


});