var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var users = require('./routes/api/User');
var partners = require('./routes/api/Partner');

var auth = require('./routes/api/auth');
var app = express();

var Schema = mongoose.Schema
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mern-secure', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/admin/users', users);
app.use('/api/admin/partners', partners);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err);
    
    if (req.app.get('env') !== 'development') {
    delete err.stack;
    }
    
    res.status(err.statusCode || 500).json(err);
    });

module.exports = app;