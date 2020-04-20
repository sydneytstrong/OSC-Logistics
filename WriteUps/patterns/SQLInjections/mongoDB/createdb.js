var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	var dbo = db.db("mydb");
  	dbo.createCollection("customers", function(err, res) {
  		if (err) throw err;
    		console.log("Collection created!");
  	});
	var myobj = {};
	myobj = { name: "Company Inc", address: "Highway 37" };
  	dbo.collection("customers").insertOne(myobj, function(err, res) {
    		if (err) throw err;
    		console.log("1 document inserted");
  	});
	myobj = [
 	  { name: 'John', address: 'Highway 71'},
 	  { name: 'Peter', address: 'Lowstreet 4'},
 	  { name: 'Amy', address: 'Apple st 652'},
  	  { name: 'Hannah', address: 'Mountain 21'},
  	  { name: 'Michael', address: 'Valley 345'},
  	  { name: 'Sandy', address: 'Ocean blvd 2'},
  	  { name: 'Betty', address: 'Green Grass 1'},
  	  { name: 'Richard', address: 'Sky st 331'},
  	  { name: 'Susan', address: 'One way 98'},
  	  { name: 'Vicky', address: 'Yellow Garden 2'},
  	  { name: 'Ben', address: 'Park Lane 38'},
  	  { name: 'William', address: 'Central st 954'},
  	  { name: 'Chuck', address: 'Main Road 989'},
  	  { name: 'Viola', address: 'Sideway 1633'}
  	];
  	dbo.collection("customers").insertMany(myobj, function(err, res) {
    		if (err) throw err;
    		console.log("Number of documents inserted: " + res.insertedCount);
    		db.close();
  });
});



/*
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
*/
