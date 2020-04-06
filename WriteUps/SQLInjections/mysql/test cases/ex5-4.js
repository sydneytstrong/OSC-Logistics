var sql = require('mysql');

var db = sql.createConnection(
  {host: 'localhost',user: 'root',password: 'password',database: 'mydb',multipleStatements: true}
);

var checkErr(err){
  if (err) throw err;
};

db.query("SELECT * FROM customers", checkErr(error));
