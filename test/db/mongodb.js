var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('nodejs', server, {safe: true});
//���ݿ����Ӵ򿪺�������еļ���
client.open(function(err, client){
    if(err) throw err;
    client.collection('test_insert',{safe: true}, function(err, collection){
        if(err) throw err;
        console.log('We are now able to perform queries.');
        collection.insert(
            {
                title: "I like cake",
                body: "It is quite good."
            },
            {safe: true},
            function(err, documents){
                if(err) throw err;
                console.log('Document ID is: ' + JSON.stringify(documents));
            }
        );
        collection.findOne(function(err,doc){
            console.log('findOne');
            console.log(doc);
        });
        var ObjectID = require('mongodb').ObjectID;
        collection.update(
            {_id: ObjectID('561dffaea33938582425ecc1')},
            {$set:{"title": "I ate too much cake5555555555"}},
            {safe: true},
            function(err){
                if(err) throw err;
            }
        );
    })
});