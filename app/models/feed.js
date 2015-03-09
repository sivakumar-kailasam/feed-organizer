import DS from 'ember-data';

export default DS.Model.extend({

	collections: DS.hasMany('collection', {
		async: true
	}),


	language: DS.attr('string'),


	subscribers: DS.attr('number'),


	title: DS.attr('string'),


	topics: DS.attr(),


	website: DS.attr('string'),


	description: DS.attr('string'),


	iconUrl: DS.attr('string'),


	visualUrl: DS.attr('string')


});