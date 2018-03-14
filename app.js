let express = require('express');
let path = require('path');
//let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const BookRepository = require('./src/book/book-repository');
const connection = require('./database/connection');
const BookFactory = require('./src/book/book-factory');
const Searcher = require('./src/search-services/searcher');
const PublisherProvider = require('./src/publisher/publisher-provider');
const nunjucks = require('nunjucks');

let index = require('./routes/index');

let app = express();

// view engine setup
nunjucks.configure('views', {
	autoescape: true,
	express: app
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('books.repo', new BookRepository(connection));
app.set('book.searcher', new Searcher(connection, new BookFactory()));
app.set('book.factory', new BookFactory());
app.set('publishers.provider', new PublisherProvider(connection));

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
