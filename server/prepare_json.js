var fs = require('fs');
var staticData = require('./static_data');
var _ = require('../node_modules/lodash')
var collections = [];
var feeds = [];


staticData.forEach(function(collection) {

	collection.feeds.forEach(function(feed, i) {
		feed.collection = [collection.id]
		feeds = feeds.concat(feed);
		collection.feeds[i] = feed.id;
	});
	collections = collections.concat(collection);
});

feeds = _.uniq(feeds);

var writeObjToJSON = function writeObjToJSON(fileName, obj) {
	fs.writeFile('./data_store/' + fileName + '.json', JSON.stringify(obj, null, 4), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Collections saved to ' + fileName + '.json');
		}
	});

};

writeObjToJSON('collections', collections);
writeObjToJSON('feeds', feeds);