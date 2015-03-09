'use strict';

module.exports = function(app) {

  var express = require('express');
  var collections = require('../static_data');
  var collectionsRouter = express.Router();

  collectionsRouter.get('/', function(req, res) {
    res.send({
      'collections': collections
    });
  });

  collectionsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  collectionsRouter.get('/:id', function(req, res) {
    res.send({
      'collections': {
        id: req.params.id
      }
    });
  });

  collectionsRouter.put('/:id', function(req, res) {
    res.send({
      'collections': {
        id: req.params.id
      }
    });
  });

  collectionsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/collections', collectionsRouter);
};