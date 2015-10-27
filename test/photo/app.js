var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos');

var app = express();

//test
console.log('process.argv: '+process.argv);
console.log('process.env.NODE_ENV: '+process.env.NODE_ENV);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//输出有颜色区分的日志，便于开发调试
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//静态文件路径
app.set('photos', __dirname + '/public/photos');
//app.use('/', routes);
app.use('/users', users);
app.get('/', photos.list);
app.get('/upload', photos.form);
console.log('----------->>>>>>>' + app.get('photos'));
app.post('/upload', multipartMiddleware, photos.submit(app.get('photos')));
app.get('/photo/:id/download', photos.download(app.get('photos')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//使用app.configure()配置特定环境的选项
/*app.configure(function(){
  app.set('view', __dirname + '/views');
  app.set('view engine', 'ejs');
});
app.configure('development', function(){
  app.use(express.errorHandler());
});*/
app.set('photos', __dirname + '/public/photos');
module.exports = app;
