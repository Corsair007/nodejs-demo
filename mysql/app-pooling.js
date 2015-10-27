var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: 'nodejs',
    port: 3307
});

var selectSQL = 'select * from t_user limit 10';

pool.getConnection(function(err, conn){
    if(err) console.log("Pool ==> "+ err);
    conn.query(selectSQL, function(err, rows){
        if(err) console.log(err);
        console.log('SELECT ==> ');
        for(var i in rows){
            console.log(rows[i]);
        }
        conn.release();
    });
});
