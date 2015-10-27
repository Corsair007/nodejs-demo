// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require('express');
//Path对象，用于处理目录的对象，提高开发效率。
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// 加载路由控制
var routes = require('./routes/index');
var users = require('./routes/users');
var movie = require('./routes/movie')
// 创建项目实例
var app = express();

// view engine setup
// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
//_dirname为全局变量,值为该项目的绝对路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log(path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
// 定义icon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 定义cookie解析器
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
    port: 27017,          //数据库的端口号
    db: 'nodejsdemo'
  })
}));

// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;

  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if ( err ) {
    res.locals.message = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert">&times</button>' + err + '</div>';
  }

  next();
});

// 匹配路径和路由
app.use('/', routes);
app.use('/users', users);

//operation mongodb
app.get('/movie/add',movie.movieAdd);//增加
app.post('/movie/add',movie.doMovieAdd);//提交
app.get('/movie/:name',movie.movieAdd);//编辑查询
app.get('/movie/json/:name',movie.movieJSON);//JSON数据
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


module.exports = app;
