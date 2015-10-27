var http = require('http');
var qs = require('querystring');
var formidable = require('formidable');
var iconv = require('iconv-lite');
var items = [];
function show(req, res){
    var html = '<html><head><title>TODO LIST</title></head><body>'
        + '<h1>Form</h1>'
        + '<ul>'
        + items.map(function(item){
            return '<li>' + item + '</li>'
        }).join('')
        + '</ul>'
        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="name" /></p>'
        + '<p><input type="file" name="file" /></p>'
        + '<p><input type="submit" value="Upload" /></p>'
        + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res){
    if(!isFormData(req)){
        res.statusCode = 400;
        res.end('Bad Request: expect multipart/form-data');
        return;
    }
    var form = new formidable.IncomingForm();
    form.on('field', function(field, value){
        console.log(field);
        console.log(value);
    });
    form.on('file', function(name, file){
        console.log(name);
        console.log(file);
    });
    form.on('end', function(){
        res.end('upload complete');
    });
    form.parse(req, function(err, fields, files){
        console.log('parse--->'+fields);
        console.log('parse--->'+files);
        res.end('upload complete!');
    });
    //上传进度计算
    form.on('progress', function(bytesReceived, bytesExpected){
        var percent = Math.floor(bytesReceived/bytesExpected * 100);
        console.log(iconv.decode('已上传', 'utf8')+percent+"%");
    });
}
function isFormData(req){
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}
var server = http.createServer(function(req, res){
    switch (req.method){
        case 'GET':
            show(req, res);
            break;
        case 'POST':
            upload(req, res);
            break;
    }
});
server.listen(3000);
