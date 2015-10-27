var express = require('express');
var router = express.Router();


function authentication(req, res, next) {
  if ( ! req.session.user ) {
    req.session.error = '请登录';
    res.redirect('/login');
  }else{
    next();
  }
}

function notAuthentication(req, res, next) {
  if ( req.session.user ) {
    req.session.error = '已登录';
    res.redirect('/');
  }else{
    next();
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.all('/login', notAuthentication);

router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});

router.post('/login', function(req, res, next) {
  var user = {
    username: 'admin',
    password: 'admin'
  };

  if ( req.body.username === user.username && req.body.password === user.password ) {
    req.session.user = user;
    res.redirect('/home');
  } else {
    req.session.error = '用户名或密码错误';
    res.redirect('/login');
  }
});


router.get('/logout', authentication);

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

router.get('/home', authentication);

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

module.exports = router;