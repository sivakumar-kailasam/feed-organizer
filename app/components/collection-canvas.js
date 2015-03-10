import Ember from 'ember';
import layout from '../templates/components/collection-canvas';

export default Ember.Component.extend({


	tagName: 'section',


	layout: layout,


	classNames: ['collections-area'],


	widthPercentToSet: 30,



	adjustHeight: function() {

		let collectionCards = this.$().find('.collection-card');
		let heightToSet = collectionCards.length * (collectionCards.height() + Number(collectionCards.css('margin-top').replace('px','')) + Number(collectionCards.css('margin-bottom').replace('px','')))  + 200;

		if(!heightToSet) {
			heightToSet= Ember.$(window).height();
		}

		this.$().height(heightToSet);

	}.on('didInsertElement'),


	actions: {

		filterFeedsByCollectionName: function(collectionId) {
			this.sendAction('filterCollectionName', collectionId);
		},

		addFeedToCollection: function(feedId, collectionId) {
			this.sendAction('addFeedToCollection', feedId, collectionId);
		},

		passRenameAction: function(collection){
			this.sendAction('renameAction', collection);
		}

	}


});