var express = require('express');
var router = express.Router();
//���ݷ��ظ��ͻ���ʱ֮ǰ�������ݽ��д���use���������м����
//�м���ķ���˳�����Ҫ����ͬ��ִ��˳�򡣶��ң��м���������HTTP���ʷ���֮ǰ�����򲻻�ִ��
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  console.log("Test------------------------->>>>>>>>>>>>>>>>>>")
  next();
});
//ʹ��param��name�Ȳ���������֤������������
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
