import api from './routes/api';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import loader from './routes/loader';
import Loadable from 'react-loadable';

try{
  import config from './devconfig.js';
}catch(e){
  console.log(e)
}

var app = express();

//this is pull from the heroku config
const MONGODB_URI = process.env.MONGODB_URI || config.mongo.URI;
var mongoose = require('mongoose');
mongoose.connect(MONGODB_URI, {config: { autoIndex: false }});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// define routes
app.use('/api', api);
app.use(express.Router().get('/', loader));
app.use(loader);
app.use(express.static(path.resolve(__dirname, './../build')));

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

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
Loadable.preloadAll().then(() => {
  app.listen(process.env.PORT || 3000, function(){
    console.log('Server listening for connections.');
  });
});

module.exports = app;
