var sql = require('mysql').createConnection(
  {host: 'localhost',user: 'root',password: 'password',database: 'mydb',multipleStatements: true}
);
sql.query("SELECT * FROM customers");
