import Ember from 'ember';

export default Ember.Controller.extend({

	
	queryParams: ['collection', 'feed'],


	collection: null,


	feed: null,


	filteredFeeds: function(){
		
		let feed = this.get('feed');

		if(Ember.isBlank(feed)){
			return this.store.findAll('feed');
		} 

	}.property('feed', 'model', 'collection'),


	collections: Ember.computed.alias('model.collections')
	

});
