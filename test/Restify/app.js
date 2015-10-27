var restify = require('restify');
var mongojs = require('mongojs');
var ip_addr = '127.0.0.1';
var port = '3333';
var server = restify.createServer({
    name: "MyApp"
});
/**
 * restify.queryParser() �������������HTTP��ѯ�ַ������� /jobs?skills=java,mysql��������������ݽ�����req.query����á�
 restify.bodyParser() ���ڷ��������Զ�����������ת��ΪJavaScript����
 restify.CORS() ����Ӧ�ó����е�CORS֧�֡�
 */
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
server.listen(port, ip_addr, function(){
    console.log('%s listening at %s ', server.name, server.url);
});


//���ݿ�����
var connection_string = '127.0.0.1:27017/nodejs';
var db = mongojs(connection_string, ['nodejs']);
var jobs = db.collection("jobs");

//����·��
var PATH = '/jobs';
server.get({path: PATH, version: '0.0.1'}, findAllJobs);
server.get({path : PATH +'/:jobId' , version : '0.0.1'} , findJob);
server.post({path : PATH , version: '0.0.1'} ,postNewJob);
server.del({path : PATH +'/:jobId' , version: '0.0.1'} ,deleteJob);

function findAllJobs(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.find().limit(20).sort({postedOn : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }

    });

}

function findJob(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.findOne({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
}

function postNewJob(req , res , next){
    var job = {};
    job.title = req.params.title;
    job.description = req.params.description;
    job.location = req.params.location;
    job.postedOn = new Date();

    res.setHeader('Access-Control-Allow-Origin','*');

    jobs.save(job , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , job);
            return next();
        }else{
            return next(err);
        }
    });
}

function deleteJob(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    jobs.remove({_id:mongojs.ObjectId(req.params.jobId)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();
        } else{
            return next(err);
        }
    })

}