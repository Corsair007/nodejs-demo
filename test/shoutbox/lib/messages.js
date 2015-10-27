var express = require('express');
var res = express.response;

/**
 *  express.response
 * 对象是Express给响应对象用的原型。 向这个对象中添加属性意味着所有中间件和路由都能访问它
 * 们。在前面的代码片段中， express.response 被赋给了一个名为 res 的变量，这样向这个对象
 * 中添加属性更容易，还提高了可读性。
 * @param msg
 * @param type
 */
res.message = function(msg, type){
  type = type || 'info';
  var sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push({type: type, string: msg});
};

res.error = function(msg){
  return this.message(msg, 'error');
};

module.exports = function(req, res, next){
  res.locals.messages = req.session.messages || [];
  res.locals.removeMessages = function(){
    req.session.messages = [];
  };
  next();
};