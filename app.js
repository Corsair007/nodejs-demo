// ���������⣬ԭ�������ⶼ��װ��connect�У��������ע��������
var express = require('express');
//Path�������ڴ���Ŀ¼�Ķ�����߿���Ч�ʡ�
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// ����·�ɿ���
var routes = require('./routes/index');
var users = require('./routes/users');
var movie = require('./routes/movie')
// ������Ŀʵ��
var app = express();

// view engine setup
// ����EJSģ�������ģ���ļ�λ�ã�Ҳ����ʹ��jade������ģ������
//_dirnameΪȫ�ֱ���,ֵΪ����Ŀ�ľ���·��
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log(path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
// ����iconͼ��
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// ������־���������
app.use(logger('dev'));
// �������ݽ�����
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ����cookie������
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    host: 'localhost',    //���ݿ�ĵ�ַ�������Ļ�����127.0.0.1��Ҳ��������������
    port: 27017,          //���ݿ�Ķ˿ں�
    db: 'nodejsdemo'
  })
}));

// ���徲̬�ļ�Ŀ¼
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

// ƥ��·����·��
app.use('/', routes);
app.use('/users', users);

//operation mongodb
app.get('/movie/add',movie.movieAdd);//����
app.post('/movie/add',movie.doMovieAdd);//�ύ
app.get('/movie/:name',movie.movieAdd);//�༭��ѯ
app.get('/movie/json/:name',movie.movieJSON);//JSON����
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
