var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport')
// Passport config
require('./extra/Passport')(passport)

//add route file
var authRoute = require('./routes/AuthRoute');
var categoriesRoute = require('./routes/CategoriesRoute');
var authRoute = require('./routes/AuthRoute');
var eventsRoute = require('./routes/EventsRoute');


var app = express();

// express session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// passport
app.use(passport.initialize())
app.use(passport.session())

// connection to db
mongoose.connect('mongodb://localhost:27017/UniToDo', {useNewUrlParser: true ,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err) => {
  console.log(err)
})
db.once('open', () => {
  console.log('Connessione')
})

// use routes
app.use('/auth', authRoute)
app.use('/categories', categoriesRoute)
app.use('/events', eventsRoute)

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
