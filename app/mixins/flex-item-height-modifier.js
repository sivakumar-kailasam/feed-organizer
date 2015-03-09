import Ember from 'ember';

/**
 * To automatically set height of the component on render
 */
export default Ember.Mixin.create({


	adjustHeight: function() {

		let windowHeight = Ember.$(window).height();

		this.$().height(windowHeight);

	}.on('didInsertElement')


});