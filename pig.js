const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = '3001'


const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

const index = require('./routes/index')
const users = require('./routes/users')


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favipig.ico')));    // loading all static files in /public
app.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))
.use(favicon(path.join(__dirname, 'public', 'images', 'favipig.ico')))
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


server.listen(port, function() {
      console.log('Now listening on pork '+port+'!')

});

// sending a notification when client is connecting
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

module.exports = app
