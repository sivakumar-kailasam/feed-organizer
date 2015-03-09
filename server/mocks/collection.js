'use strict';

module.exports = function(app) {

  var express = require('express');
  var collections = require('../data_store/collections.json');
  var collectionRouter = express.Router();

  collectionRouter.get('/', function(req, res) {
    res.send({
      'collection': collection
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

  app.use('/api/collection', collectionRouter);
};