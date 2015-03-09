import Ember from 'ember';

/**
 * To automatically set height of the component on render
 */
export default Ember.Mixin.create({


	adjustHeight: function() {

		let percentOfScreenHeight = this.get('heightPercentToSet');

		Ember.assert(Ember.isPresent(percentOfScreenHeight), 'Component must declare heightPercentToSet to use FlexItemHeightModifierMixin');

		let windowHeight = Ember.$(window).height();
		
		this.$().height(windowHeight * (percentOfScreenHeight / 100));

	}.on('didInsertElement')


});