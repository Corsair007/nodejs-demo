/*
 *使用mongoose连接mongodb
   打开或关闭MongoDB连接 ；
   注册schema；
   添加任务；
   搜索文档；
   更新文档；
   删除文档
 */
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/nodejsdemo');
var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    desc: String
});
mongoose.model('Task', Tasks);
var Task = mongoose.model('Task');
//delete
Task.findById('561f80a7a1ec0770199a16ef', function(err, task){
   task.remove();
    console.log('remove');
});
//update
/*Task.update(
    {_id: '561f80a7a1ec0770199a16ef'},
    {desc: 'kkkkkkkkkkkkkk'},
    function(err, rows_updated){
        if(err) throw  err;
        console.log('updated.')
});*/
//select
/*Task.find({'project': 'Bikeshed'}, function(err, tasks){
for(var i in tasks){
    console.log('ID: '+tasks[i]._id);
    console.log('DESC: '+tasks[i].desc);
}
});*/
//add
/*var task = new Task();
task.project = 'Bikeshed';
task.desc = 'Paint the bikeshed red.'
task.save(function(err){
    if(err) throw err;
    console.log('Task saved!');
});*/
//mongoose.disconnection();