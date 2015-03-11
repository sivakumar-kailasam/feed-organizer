import Ember from 'ember';
import layout from '../templates/components/collection-card';


export default Ember.Component.extend({

	layout: layout,

	classNames: ['collection-card', 'z-depth-1', 'blue-text'],

	classNameBindings: ['dragClass'],

	dragClass: '',

	feedsToPreview: function() {
		return this.get('collection.feeds').slice(0, 5);
	}.property('collection.feeds'),

	feedLength: function() {

		let noOfFeeds = this.get('collection.feeds').get('length');

		if (noOfFeeds === 0) {
			return 'No Feeds';
		} else if (noOfFeeds === 1) {
			return '1 Feed';
		} else {
			return `${noOfFeeds} Feeds`;
		}

	}.property('collection.feeds'),


	dragLeave: function(event) {
		
		if (this.get('disableFeedAddition')) {
			return;
		}
		
		event.preventDefault();
		return this.set('dragClass', '');
	},

	dragOver: function(event) {
		
		if (this.get('disableFeedAddition')) {
			return;
		}
		
		event.preventDefault();
		return this.set('dragClass', 'z-depth-3');
	},

	animateCardDrop: function(effectToUse) {
		
		if (this.get('disableFeedAddition')) {
			return;
		}

		let _this = this;
		_this.set('dragClass', 'animated ' + effectToUse);

		Ember.run.later(function() {
			_this.set('dragClass', '');
		}, 1000);
	},

	drop: function(event) {

		if (this.get('disableFeedAddition')) {
			return;
		}

		let feedId = event.dataTransfer.getData('text/data');

		if (this.get('collection').get('feeds').filterBy('id', feedId).get('length')) {
			return this.animateCardDrop('shake');
		}

		let collectionId = this.get('collection.id');

		this.animateCardDrop('pulse');

		Ember.debug(`Dropped feed ${feedId} on collection ${collectionId}`);
		return this.sendAction('addFeedToCollection', feedId, collectionId);

	},


	actions: {

		showFeedsInCollection: function() {
			this.sendAction('filterByCollection', this.get('collection.id'));
		},

		editCollection: function() {
			this.sendAction('renameAction', this.get('collection'));
		},

		showAllFeeds: function() {
			this.sendAction('filterByCollection', null);
		},

		toggleCollectionVisibility: function() {
			this.sendAction('toggleCollectionVisibility', this.get('collection'));
		}

	}


});