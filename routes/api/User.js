var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../../models/User');
var UsersController = require("../../controllers/usersController");
//var passport = require('passport');
var passport = require('../../config/passport')(passport);

/* GET ALL USERS */
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
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

/* SAVE USERS */
router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
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

// Matches with "/admin/users"
router.route("/admin/users")
  .get(UsersController.findAll)
  .post(UsersController.create);

// Matches with "/admin/users/_id"
router
  .route("/admin/users/_id")
  .get(UsersController.findById)
  .put(UsersController.update)
  .delete(UsersController.remove);

module.exports = router;