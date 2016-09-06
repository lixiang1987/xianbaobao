var express = require('express');
var logger = require('morgan');
var app = express();
var config = require('./config.json');

var cooke_parser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
app.use(cooke_parser());
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 2
  }),
  secret: config.session_secret,
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', '../webapps');
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/about', function (req, res) {
  res.render('about');
});
app.get('/contact', function (req, res) {
  res.render('contact');
});
app.get('/item', function (req, res) {
  res.render('item');
});
app.get('/items', function (req, res) {
  res.render('items');
});
app.get('/itemshistory', function (req, res) {
  res.render('itemshistory');
});
app.get('/order', function (req, res) {
  res.render('order');
});
app.get('/orderconfirm', function (req, res) {
  res.render('orderconfirm');
});
app.get('/orderinfo', function (req, res) {
  res.render('orderinfo');
});

app.use('/', require('./app/user'));
app.use('/api/login', require('./api/login'));
app.use('/api/item', require('./api/item'));

app.use(express.static('../webapps'));

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(9090, function () {
  console.log('Example app listening on port 9090!');
});
