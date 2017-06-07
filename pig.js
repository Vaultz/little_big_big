const path = require('path')
const express = require('express')
const app = express()
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const port = '3001'

const index = require('./routes/index');
const users = require('./routes/users');



// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favipig.ico')));    // loading all static files in /public
app.use(logger('dev'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favipig.ico')))

.set('view engine', 'jade')

.use('/', index)

.post('/', function (req, res) {
  res.send('Hello POSTWorld!')
})

// catch 404 and forward to error handler
.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// error handler
.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

.listen(port, function () {  // DEBUG=little_big_pig:* npm start
  console.log('Now listening on port '+port+'!')
})


module.exports = app
