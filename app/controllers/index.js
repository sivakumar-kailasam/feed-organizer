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
			this.set('collection', collectionId)
			''
		}

	}


});