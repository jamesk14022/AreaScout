import dotenv from 'dotenv';
import api from './routes/api';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import loader from './routes/loader';
import Loadable from 'react-loadable';
import mongoose from 'mongoose';
var app = express();
dotenv.config();

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "content-type, Content-Type, Accept");
  if ( req.method === 'OPTIONS' ) {
      res.end();
  }else{
    // Pass to next layer of middleware
    next();
}
});

mongoose.connect(process.env.MONGODB_URI, {config: { autoIndex: false }});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, './../build')));

// define routes
app.use('/api', api);
app.use(express.Router().get('/', loader));
app.use(loader);

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
