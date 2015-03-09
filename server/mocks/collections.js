'use strict';

module.exports = function(app) {

  var express = require('express');
  var collectionRouter = express.Router();
  var fs = require('fs');


  collectionRouter.get('/', function(req, res) {
    fs.readFile('server/data_store/collections.json', function(err, collectionData) {
      fs.readFile('server/data_store/feeds.json', function(feedErr, feedData) {
        res.send({
          collection: JSON.parse(collectionData),
          feed: JSON.parse(feedData)
        });
      })
    });
  });

  collectionRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  collectionRouter.get('/:id', function(req, res) {
    res.send({
      'collection': {
        id: req.params.id
      }
    });
  });

  collectionRouter.put('/:id', function(req, res) {
    res.send({
      'collection': {
        id: req.params.id
      }
    });
  });

  collectionRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/collections', collectionRouter);
};