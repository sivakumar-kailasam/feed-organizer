import Ember from 'ember';
import layout from '../templates/components/collection-card';


export default Ember.Component.extend({


	layout: layout,


	classNames: ['collection-card', 'z-depth-1'],


	classNameBindings: ['dragClass'],


	dragClass: '',


	dragLeave: function(event) {
		event.preventDefault();
		return this.set('dragClass', '');
	},


	dragOver: function(event) {
		event.preventDefault();
		return this.set('dragClass', 'z-depth-3');
	},

	animateCardDrop: function(effectToUse) {
		let _this = this;
		_this.set('dragClass', 'animated ' + effectToUse);

		Ember.run.later(function() {
			_this.set('dragClass', '');
		}, 1000);
	},

	drop: function(event) {

		let feedId = event.dataTransfer.getData('text/data');

		if (this.get('collection').get('feeds').filterBy('id', feedId).get('length')) {
			return this.animateCardDrop('shake');
		}

		let collectionId = this.get('collection.id');

		this.animateCardDrop('pulse');

		Ember.debug(`Dropped feed ${feedId} on collection ${collectionId}`);
		return this.sendAction('addFeedToCollection', feedId, collectionId);

	},


	click: function() {
		this.sendAction('filterByCollection', this.get('collection.id'));
	}


});