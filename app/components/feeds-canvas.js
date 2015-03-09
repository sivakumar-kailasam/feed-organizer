import Ember from 'ember';
import layout from '../templates/components/feeds-canvas';

export default Ember.Component.extend({


	layout: layout,


	classNames: ['feed-area'],


	adjustHeight: function() {

		let windowHeight = Ember.$(window).height();
		this.$().height(windowHeight * 0.6);
		
	}.on('didInsertElement')

});