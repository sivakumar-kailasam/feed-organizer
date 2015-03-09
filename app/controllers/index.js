import Ember from 'ember';

export default Ember.Controller.extend({


	queryParams: ['collection', 'feed'],


	collection: null,


	feed: null,


	filteredFeeds: function() {

		let collection = this.get('collection');

		if (Ember.isBlank(collection)) {
			return this.store.all('feed');
		} else {
			return this.store.all('feed').filter(function(feed) {

				if (feed.get('collections').filterBy('id', collection).get('length') > 0) {
					return feed;
				}
			});
		}


	}.property('model', 'collection'),


	collections: Ember.computed.alias('model.collections'),


	actions: {

		filterByCollection: function(collectionId) {
			this.set('collection', collectionId);
		},

		addFeedToCollection: function(feedId, collectionId) {

			Ember.debug(`Received request to add ${feedId} to ${collectionId}`);

			let _this = this;

			_this.store.all('feed').filter(feed => {
				if (feed.get('id') === feedId) {
					return feed;
				}
			}).forEach(feed => {
				_this.store.find('collection', collectionId).then(function(collection) {
					feed.get('collections').pushObject(collection);
				});
			});

		}

	}


});