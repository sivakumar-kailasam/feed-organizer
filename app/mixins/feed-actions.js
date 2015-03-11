import Ember from 'ember';

export default Ember.Mixin.create({


	_changeWatcherProperty: '',


	skipConfirmOnDelete: false,


	feedToRemove: null,


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

		deleteFeed: function(feedToDelete, skipDialog) {

			if (this.get('skipConfirmOnDelete') || skipDialog) {
				this._deleteFeed(feedToDelete);
				Ember.$('#delete-feed-confirmation-dialog').closeModal();
			} else {
				this.set('feedToRemove', feedToDelete);
				Ember.$('#delete-feed-confirmation-dialog').openModal();
			}

		},

		toggleSkipConfirmOnDelete: function() {
			this.toggleProperty('skipConfirmOnDelete');
		}

	}
});