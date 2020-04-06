var sql = require('mysql');

var db = sql.createConnection(
  {host: 'localhost',user: 'root',password: 'password',database: 'mydb',multipleStatements: true}
);
db.connect(function(err) {
        if(err) throw err;
        console.log("Connected!");
});

var dbcall = db.query();

dbcall();
