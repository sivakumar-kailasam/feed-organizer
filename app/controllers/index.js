import Ember from 'ember';

export default Ember.Controller.extend({


	queryParams: ['collection', 'feed'],


	collection: null,


	feed: null,


	filteredFeeds: function() {

		let collection = this.get('collection');

		if (Ember.isBlank(collection)) {
			return this.store.findAll('feed');
		} else {
			return this.store.find('feed', {
				collection: collection
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
			
			_this.store.find('feed', feedId).then(feed => {
				console.info(feed);
				_this.store.find('collection', collectionId).then(function(collection){
					console.info(collection);
					feed.get('collections').pushObject(collection);	
				}).then(function(){
					feed.save();	
				});
				
				
			});

		}

	}


});