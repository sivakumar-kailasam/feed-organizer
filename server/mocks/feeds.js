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
    
    res.status(201).end();

  });

  feedRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/feeds', feedRouter);
};