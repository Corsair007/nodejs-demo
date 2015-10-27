var express = require('express');
var router = express.Router();
//数据返回给客户端时之前，对数据进行处理，use方法调用中间件，
//中间件的放置顺序很重要，等同于执行顺序。而且，中间件必须放在HTTP动词方法之前，否则不会执行
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  console.log("Test------------------------->>>>>>>>>>>>>>>>>>")
  next();
});
//使用param对name等参数进行验证或其他处理……
router.param('name', function(req, res, next, name) {
  console.log(name);
  req.name = name;
  next();
});

router.get('/:name', function(req, res) {
  res.send('hello ' + req.params.name + '!');
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
