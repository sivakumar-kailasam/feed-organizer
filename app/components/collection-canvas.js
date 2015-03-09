import Ember from 'ember';
import layout from '../templates/components/collection-canvas';
import FlexItemHeightModifierMixin from '../mixins/flex-item-height-modifier';

export default Ember.Component.extend(FlexItemHeightModifierMixin, {


	tagName: 'section',

	
	heightPercentToSet: 30,


	layout: layout,


	classNames: ['collections-area'],


	actions: {
		filterFeedsByCollectionName: function(collectionId){
			this.sendAction('filterCollectionName', collectionId);
		}
	}


});