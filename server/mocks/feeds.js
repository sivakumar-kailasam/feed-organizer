'use strict';

module.exports = function(app) {

  var express = require('express');
  var feedRouter = express.Router();
  var fs = require('fs');
  var _ = require('lodash');

  feedRouter.get('/', function(req, res) {
    fs.readFile('server/data_store/collections.json', function(err, collectionData) {
      fs.readFile('server/data_store/feeds.json', function(feedErr, feedData) {

        var collectionId = req.query.collection;
        var feedDataToReturn = JSON.parse(feedData);

        if (!collectionId) {
          res.send({
            collection: JSON.parse(collectionData),
            feed: feedDataToReturn
          });
        } else {

          feedDataToReturn = feedDataToReturn.filter(function(feed) {
            if (feed.collections.indexOf(collectionId) !== -1) {
              return feed;
            }
          });

          res.send({
            feed: feedDataToReturn
          });

        }
      });
    });
  });

  feedRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  feedRouter.get('/:id', function(req, res) {
    fs.readFile('server/data_store/feeds.json', function(err, data) {
      var feed = _.find(JSON.parse(data), function(feed) {
        return feed.id === req.params.id;
      });

      res.send({
        feed: feed
      });
    });

  });

  feedRouter.put('/:id', function(req, res) {
    fs.readFile('server/data_store/collections.json', function(err, collectionData) {
      fs.readFile('server/data_store/feeds.json', function(feedErr, feedData) {

        var collectionsToUpdate = [];
        var feedDataObj = JSON.parse(feedData);

        var feedToReturn = feedDataObj.filter(function(feed) {
          if (feed.id === req.params.id) {
            feed.collections = req.body.feed.collections;
            collectionsToUpdate = feed.collections;
            return feed;
          }
        });

        var updatedCollections = [];
        var collectionDataObj = JSON.parse(collectionData);

        var updatedCollections = collectionDataObj.filter(function(collection) {
          if (collectionsToUpdate.indexOf(collection.id) !== -1) {
            collection.feeds.push(req.params.id);
            collection.feeds = _.uniq(collection.feeds);
            console.info(collection.feeds);
            return collection;
          }
        });

        var writeObjToJSON = function writeObjToJSON(fileName, obj) {
          fs.writeFile('server/data_store/' + fileName + '.json', JSON.stringify(obj, null, 4), function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Collections saved to server/data_store/' + fileName + '.json');
            }
          });

        };

        writeObjToJSON('collections', collectionDataObj);
        writeObjToJSON('feeds', feedDataObj);


        res.send({
          'feed': feedToReturn,
          'collection': updatedCollections
        });

      })
    });

  });

  feedRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/feeds', feedRouter);
};