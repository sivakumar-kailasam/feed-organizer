import Ember from 'ember';

export default Ember.Route.extend({

	model: function(){
		return Ember.RSVP.hash({
			feeds: this.store.findAll('feed'),
			collections: this.store.all('collection')
		});
	}
	
});
