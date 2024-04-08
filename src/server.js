var createError = require('http-errors');
var express = require('express');
var session = require('express-session');

var hbs = require('express-handlebars');
var Handlebars = require('handlebars')

var passport = require('passport');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var flash = require('connect-flash');
// var rateLimit = require('express-rate-limit')
// var cors = require('cors')

var indexRouter = require('./routes/index.routes');

// connect mongoose db
var mongodb = require('./config/connectionConfig');
mongodb._connect();

var port = process.env.PORT || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/resources/views'));

app.engine('hbs', hbs.engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    json: function (context) { 
        return JSON.stringify(context);
    },
    eq: function (a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    equal: function (a, b) {
      return a === b;
    },
    roleLabel: function (role) {
      if (role === 'client') {
        return 'Khách hàng';
      }
      else if (role === 'admin') {
        return 'Quản trị viên';
      }
      return role;
    },
    ifeq: function(arg1, arg2, options) {
      return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    },
    noteq: function(arg1, arg2, options) {
      return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
    },
    no1: function (val) {
        return val + 1;
    },
    even: function(val){
      if (val % 2 == 0){
        return 'even'
      }
      else {
        return 'odd'
      }
    }
}
}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static('public'));
app.use('/admin/customers', express.static('public'));
app.use('/admin/customers/update', express.static('public'));
app.use('/admin/rooms/create', express.static('public'));
app.use('/admin/rooms', express.static('public'));
app.use('/admin/calendar', express.static('public'));
app.use('/admin/orders', express.static('public'));

app.use('/history', express.static('public'));
app.use('/profile', express.static('public'));
app.use('/bookroom', express.static('public'));
app.use('/history/:username', express.static('public'));
app.use('/detail', express.static('public'));


app.use('/error', express.static('public'));

// session middleware
app.use(session({
  secret: 'mysecret',
  cookie: { maxAge: 3 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./config/passportConfig')(passport);

var flashMessage = require('./middlewares/flashMessage');
app.use(flashMessage);

indexRouter(app)

app.get('/error/404', function (req, res) {
  res.render('error/404', { layout: false });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message);
  res.render('error/404', { layout: false });
});




app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  'Press Ctrl-C to terminate.'
))

module.exports = app;
