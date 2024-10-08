var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientRouter = require('./routes/client');
var restaurantRouter = require('./routes/restaurant');
var deliveryManRouter = require('./routes/deliveryMan');
var shopRouter = require('./routes/shop');
var deliveryManOutRouter = require('./routes/deliveryManOut');
var deliveryManOut2Router = require('./routes/deliveryManOut2');
var menuRouter = require('./routes/menu');



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const cors = require("cors");
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/client', clientRouter);
app.use('/restaurant', restaurantRouter);
app.use('/deliveryMan', deliveryManRouter);
app.use('/shop', shopRouter);
app.use('/deliveryManOut', deliveryManOutRouter);
app.use('/deliveryManOut2', deliveryManOut2Router);
app.use('/menu', menuRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
