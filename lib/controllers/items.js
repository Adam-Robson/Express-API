const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const checkUser = require('../middleware/check-user');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({
        title: req.body.title,
        body: req.body.body,
        completed: req.body.completed,
        user_id: req.user.id
      });
      res.json(item);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', [authenticate, checkUser], async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
      if (!item) next();
    } catch (err) {
      next(err);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      if (!items) next();
      res.json(items);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', [authenticate, checkUser], async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id);
      if (!item) null;
      res.json(item);
    } catch (err) {
      next(err);
    }
  });
