import Ember from 'ember';

export default Ember.Controller.extend({


	queryParams: ['collection', 'feed'],


	collection: null,


	feed: null,


	// A property to trigger changes on modifying collections/feeds
	_changeWatcherProperty: '',


	filteredFeeds: function() {

		let collectionId = this.get('collection');

		if (Ember.isBlank(collectionId)) {
			return this.store.all('feed');
		} else {
			return this.store.all('feed').filter(feed => {
				if (feed.get('collection.id') === collectionId) {
					return feed;
				}
			});
		}


	}.property('_changeWatcherProperty', 'collection'),


	collections: Ember.computed.alias('model.collections'),


	actions: {

		filterByCollection: function(collectionId) {
			this.set('collection', collectionId);
		},

		deleteFeed: function(feedToDelete) {

			let _this = this;

			this.store.all('feed').forEach(feed => {
				if (feedToDelete.get('id') === feed.get('id')) {

					_this.store.all('collection').forEach(collection => {
						collection.get('feeds').removeObject(feed);
					});

					Ember.debug(`Delete feed ${feed.get('id')}`);
					feed.deleteRecord();
					_this.set('_changeWatcherProperty', Date.now());
				}
			});

		},

		addFeedToCollection: function(feedId, collectionId) {

			Ember.debug(`Received request to add ${feedId} to ${collectionId}`);

			let _this = this;

			let feed = _this.store.all('feed').filter(feed => {
				if (feed.get('id') === feedId) {
					return feed;
				}
			}).get('firstObject');

			let oldCollection = feed.get('collection');

			_this.store.all('collection').forEach(collection => {

				if (collection.get('id') === oldCollection.get('id')) {
					collection.get('feeds').removeObject(feed);
				} else if (collection.get('id') === collectionId) {
					collection.get('feeds').pushObject(feed);
					feed.set('collection', collection);
					_this.set('_changeWatcherProperty', Date.now());
				}

			});


		}

	}


});