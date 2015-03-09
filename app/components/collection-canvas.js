import Ember from 'ember';
import layout from '../templates/components/collection-canvas';

export default Ember.Component.extend({

	
	layout: layout,


	classNames: ['collections-area'],


	adjustHeight: function() {

		let windowHeight = Ember.$(window).height();
		this.$().height(windowHeight * 0.4);
		
	}.on('didInsertElement')


});