var sql = require('mysql');

var db = sql.createConnection(
  {host: 'localhost',user: 'root',password: 'password',database: 'mydb',multipleStatements: true}
);

var dbcall = db.query();

dbcall();
