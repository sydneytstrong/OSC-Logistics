var sql = require('mysql');
var con = sql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'mydb'
});

con.connect(function(err) {
	if(err) throw err;
	console.log("Connected!");
});

var cmd ="";
cmd = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
con.query(cmd, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

cmd = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
con.query(cmd, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});

cmd = "INSERT INTO customers (name, address) VALUES ?";
var values = [
    	['John', 'Highway 71'],
    	['Peter', 'Lowstreet 4'],
   	['Amy', 'Apple st 652'],
   	['Hannah', 'Mountain 21'],
    	['Michael', 'Valley 345'],
    	['Sandy', 'Ocean blvd 2'],
    	['Betty', 'Green Grass 1'],
    	['Richard', 'Sky st 331'],
    	['Susan', 'One way 98'],
    	['Vicky', 'Yellow Garden 2'],
    	['Ben', 'Park Lane 38'],
    	['William', 'Central st 954'],
    	['Chuck', 'Main Road 989'],
    	['Viola', 'Sideway 1633']
  ];
  con.query(cmd, [values], function (err, result) {
    	if (err) throw err;
    	console.log("Number of records inserted: " + result.affectedRows);
  });

//con.end();
