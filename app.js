// app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sampledataRouter = require('./routes/sample_data');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'webslesson',
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sample_data', sampledataRouter);



// Define a route for the dashboard
app.get('/dashboard', (req, res) => {
  // Render the dashboard.ejs file
  res.render('dashboard', { title: 'Dashboard' });
});
app.get('/policy1', (req, res) => {
  // Render the dashboard.ejs file
  res.render('sample_data', { title: 'policy'});
});

// Define a route for the policy
app.get('/policy', (req, res) => {
  // Render the sample_data.ejs file with the 'add' action
  res.render('sample_data', { title: 'Policy', action: 'add' });
});
app.get('/risk', (req, res) => {
  // Render the sample_data.ejs file with the 'add' action
  res.render('sample_data', { title: 'risk', action: 'addRisk' });
});

app.get('/r', (req, res) => {
  // Render the sample_data.ejs file without any specific action
  res.render('index', { title: 'risktable', action: 'risk11' }); // Use 'list' or any other value you prefer
});
app.get('/riskManagements', (req, res) => {
  // Render the sample_data.ejs file with the 'add' action
  res.render('riskManagements', { title: 'riskManagements'});
});



// Redirect root to the dashboard
app.get('/', (req, res) => {
  res.redirect('/dashboard');
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
  res.render('error');
});

module.exports = app;
