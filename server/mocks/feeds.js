'use strict';

module.exports = function(app) {

  var express = require('express');
  var feedRouter = express.Router();
  var fs = require('fs');
  var _ = require('lodash');

  feedRouter.get('/', function(req, res) {
    fs.readFile('server/data_store/feeds.json', function(err, data) {
      res.send({
        feed: JSON.parse(data)
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
      })

      res.send({feed: feed});
    });

  });

  feedRouter.put('/:id', function(req, res) {
    res.send({
      'feed': {
        id: req.params.id
      }
    });
  });

  feedRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/feeds', feedRouter);
};