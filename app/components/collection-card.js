import Ember from 'ember';
import layout from '../templates/components/collection-card';


export default Ember.Component.extend({


	layout: layout,


	classNames: ['collection-card', 'z-depth-1'],


	classNameBindings: ['dragClass'],


	dragClass: '',


	dragLeave: function(event) {
		event.preventDefault();
		return this.set('dragClass', '');
	},


	dragOver: function(event) {
		event.preventDefault();
		return this.set('dragClass', 'z-depth-3');
	},


	drop: function(event) {

		let data;
		let _this = this;
		let collectionId = _this.get('collection.id');
		_this.set('dragClass', 'animated pulse');

		Ember.run.later(function() {
			_this.set('dragClass', '');
		}, 1000);

		data = event.dataTransfer.getData('text/data');
		Ember.debug(`Dropped feed ${data} on collection ${collectionId}`);
		return _this.sendAction('addFeedToCollection', data, collectionId);

	},


	click: function() {
		this.sendAction('filterByCollection', this.get('collection.id'));
	}


});