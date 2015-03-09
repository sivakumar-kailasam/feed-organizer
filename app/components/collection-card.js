import Ember from 'ember';
import layout from '../templates/components/collection-card';


export default Ember.Component.extend({


	layout: layout,


	classNames: ['collection-card'],


	click: function() {
		this.sendAction('filterByCollection', this.get('collection.id'));
	}


});