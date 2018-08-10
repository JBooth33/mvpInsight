var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL ADMIN USERS */
router.get('/admin', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        User.find(function (err, books) {
            if (err) return next(err);
            res.json(users);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

/* SAVE ADMIN USERS */
router.post('/admin', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        User.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});


const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;

/* GET TOKEN */
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;