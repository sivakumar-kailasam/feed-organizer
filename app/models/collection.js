import DS from 'ember-data';

export default DS.Model.extend({

	label: DS.attr('string'),


	topics: function() {

		//TODO form topics based off feeds
		return;

	}.property('feeds'),


	feeds: DS.hasMany('feed', {
		async: true
	})


});