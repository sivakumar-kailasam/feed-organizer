'use strict';

module.exports = function(app) {

  var express = require('express');
  var feeds = require('../data_store/feeds.json');
  var feedRouter = express.Router();

  feedRouter.get('/', function(req, res) {
    res.send({
      'feed': feeds
    });
  });

  feedRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  feedRouter.get('/:id', function(req, res) {
    res.send({
      'collection': {
        id: req.params.id
      }
    });
  });

  feedRouter.put('/:id', function(req, res) {
    res.send({
      'collection': {
        id: req.params.id
      }
    });
  });

  feedRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/collection', feedRouter);
};