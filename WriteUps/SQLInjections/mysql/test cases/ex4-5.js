var sql = require('mysql');

var db = sql.createConnection(
  {host: 'localhost',user: 'root',password: 'password',database: 'mydb',multipleStatements: true}
);
var cmd = "SELECT * FROM customers"
db.query(cmd);
