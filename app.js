const api = require('./routes/api');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

try{
  var config = require('./config.js');
}catch(e){
  console.log(e)
}

//this is pull from the heroku config
const MONGODB_URI = process.env.MONGODB_URI || config.mongo.URI;

var mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {config: { autoIndex: false }});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// define routes
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
