import Ember from 'ember';
import CollectionActions from '../mixins/collection-actions';
import FeedActions from '../mixins/feed-actions';


export default Ember.Controller.extend(CollectionActions, FeedActions, {

	queryParams: ['collection', 'feed'],

	collection: null,

	feed: null,


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


	collections: function() {
		return this.get('model.collections').sortBy('order');
	}.property('model.collections'),


	actions: {


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