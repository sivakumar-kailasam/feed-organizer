import Ember from 'ember';



export default Ember.Controller.extend({


	queryParams: ['collection', 'feed'],


	collection: null,


	feed: null,


	prevCollectionName: null,


	newCollectionName: null,


	skipConfirmOnDelete: false,


	feedToRemove: null,


	doesNewCollectionNameExist: function() {

		let existingCollectionNames = this.store.all('collection').getEach('label');
		let newCollectionName = this.get('newCollectionName');

		if (newCollectionName === this.get('prevCollectionName')) {
			return false;
		}

		return (existingCollectionNames.indexOf(newCollectionName) !== -1);

	}.property('newCollectionName'),


	_isSaveDisabled: function() {
		return Ember.isEmpty(this.get('newCollectionName')) && this.get('doesNewCollectionNameExist');
	}.property('newCollectionName', 'doesNewCollectionNameExist'),


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


	collections: function() {
		return this.get('model.collections').sortBy('order')
	}.property('model.collections'),


	_deleteFeed: function(feedToDelete) {

		let _this = this;

		this.store.all('feed').forEach(feed => {
			if (feedToDelete.get('id') === feed.get('id')) {

				_this.store.all('collection').forEach(collection => {
					collection.get('feeds').removeObject(feed);
				});

				Ember.debug(`Delete feed ${feed.get('id')}`);
				feed.deleteRecord();
				window.toast(`<span>${feed.get('title')} has been removed</span>`, 1000);
				_this.set('_changeWatcherProperty', Date.now());
			}
		});

	},


	actions: {

		filterByCollection: function(collectionId) {
			Ember.debug(`Filtering by collection id : ${collectionId}`);
			this.set('collection', collectionId);
		},

		deleteFeed: function(feedToDelete, skipDialog) {

			if (this.get('skipConfirmOnDelete') || skipDialog) {
				this._deleteFeed(feedToDelete);
				Ember.$('#delete-feed-confirmation-dialog').closeModal();
			} else {
				this.set('feedToRemove', feedToDelete);
				Ember.$('#delete-feed-confirmation-dialog').openModal();
			}

		},


		renameCollection: function(collection) {
			this.setProperties({
				'prevCollectionName': collection.get('label'),
				'newCollectionName': collection.get('label')
			});
			Ember.$('#collection-rename-dialog').openModal();
			Ember.$('input[name="newCollectionName"]').focus();
		},

		saveCollectionName: function() {

			if (this.get('_isSaveDisabled')) {
				return;
			}

			let newCollectionName = this.get('newCollectionName');
			let prevCollectionName = this.get('prevCollectionName');

			this.store.all('collection').forEach(collection => {
				if (collection.get('label') === prevCollectionName) {
					collection.set('label', newCollectionName);
				}
			});


			this.set('_changeWatcherProperty', Date.now());

			Ember.$('#collection-rename-dialog').closeModal();

			window.toast(`${prevCollectionName} is now called ${newCollectionName}`, 4000);

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


		},


		toggleSkipConfirmOnDelete: function() {
			this.toggleProperty('skipConfirmOnDelete');
		}

	}


});