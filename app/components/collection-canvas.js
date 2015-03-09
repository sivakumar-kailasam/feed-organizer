import Ember from 'ember';
import layout from '../templates/components/collection-canvas';
import FlexItemHeightModifierMixin from '../mixins/flex-item-height-modifier';

export default Ember.Component.extend(FlexItemHeightModifierMixin, {


	tagName: 'section',


	layout: layout,


	classNames: ['collections-area'],


	widthPercentToSet: 30,


	actions: {

		filterFeedsByCollectionName: function(collectionId) {
			this.sendAction('filterCollectionName', collectionId);
		},

		addFeedToCollection: function(feedId, collectionId) {
			this.sendAction('addFeedToCollection', feedId, collectionId);
		}

	}


});