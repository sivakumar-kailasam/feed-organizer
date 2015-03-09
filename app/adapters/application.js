import DS from 'ember-data';

/**
 * A REST based adapter for the entire app
 */
export default DS.RESTAdapter.extend({
	namespace: 'api'
});