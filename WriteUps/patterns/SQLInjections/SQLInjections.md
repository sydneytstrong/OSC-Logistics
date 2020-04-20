# SQL Injection write up {-}
This injection attack exploits query calls to a nodeJS's database connection.

# Description
The attack uses unexpected input to send a malicious command to a database. This is initiated by entering un-sanitized input for the web application to send to the nodeJS server to query on the database. This payload will be executed by the database.

# Capabilities
This injections capabilities lets the attacker enter any SQL/NoSQL command on an SQL/NoSQL database.

- View sensitive data
- Run commands which can DoS the server
  - Dropping a table or deleting an entire database
  - Running a while loop or a long command that takes up CPU
- Upgrade user privileges and view other databases on the server

# Limitations
This injection is limited to the database the web app is connected to.

- Attacker does not have access to the web app's server information
- Attacker can only use database commands 

# Mitigations

## Application level
General explanation of what a developer can do to avoid this.

- Sanitize user input
- Use npm to packages to detect and prevent SQL Injection
  - ```sql-injection```
  - ```sqlstring```
- Ensure that sending multiple commands is false when establishing an SQL connection
- Only connect to one database at a time
  - Don't connect to the server without specifying the database
- Avoid concatenating command strings with user input, and instead use placeholders in SQL commands and use the built in escape function in mysql
  - **Bad:** ``` "SELECT * FROM * WHERE username =" + usrname; ```
  - **Better: **```SELECT ? FROM customers WHERE username ='+mysql.escape(username)+' and password = '+ mysql.escape(passwrd) ;```
- Prepared statements can be vulnerable if not carefully used. An example can be found [here](http://www.cse.usf.edu/~ligatti/papers/SQL-IDIA.pdf).
- Avoid using the `$where` command when querying in mongo and use built in sanitizing functions
  - **Bad:** `query = {$where: user_input};`
  - **Better:** `query = {name: sanitize(user_input)};`
- Use the `findOne()` function instead of the `find()` in mongo

## System level
General explanation of what a system administrator can do to avoid this.

- Ensure the SQL server has different users for different web apps to connect to
  - Add different passwords for each user
- Ensure the practice of least privilege

# Examples

## Using `mysql` npm package

### Dependencies
`mysql`
`express`

### Exploitable Source

#### [sqlexploit.js](https://github.uconn.edu/jrs12014/OSC-UConn/blob/master/WriteUps/SQLInjections/mysql/sqlexploit.js)
``` javascript
app.post('/', function(req, res){
        name = req.body.name_field;
		cmd = "SELECT name, address FROM customers WHERE name = '" + name + "'";
		con.query(cmd, function(err, result, fields){
			if (err) throw err;
			res.send(result);
		});
});
```
### Running the exploit

#### Starting the SQL Server
After downloading a mysql server from [mysql](https://dev.mysql.com/downloads/mysql/), you can start the server by doing

- `foo@bar:~$ systemctl start mysql`

Create a user and password to use for the nodeJS server.

#### Starting the NodeJS Server

After downloading the [source](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/SQLInjections/mysql) and installing the packages, make sure the `sqlexploit.js`  and `createdb.js` files has the correct username and password for your other server. You can run the server by doing:

- `foo@bar:~$ cd /path/to/sqlexploit.js/`
- `foo@bar:~$ node createdb.js`
- `foo@bar:~$ node sqlexploit.js`

#### Payload Procedure

- Go to `localhost:8080` in your web browser
- Type `' or ''='`
  - This will return the contents of the table
- Type `'; select * from information_schema.tables where ''='`
  - This will return all the tables on the server
- Type `'; DROP found_table; --'`

### Why is this present?

This is present because the input from the user adds further SQL commands that the developer did not expect. The input string gives the user direct access to the database in use and can enter any command as if it were their own.

## Using `mongodb` npm package

### Dependencies

`mongodb`
`express`

### Exploitable Source
#### [mongoexploit.js](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/SQLInjections/mongoDB/mongoexploit.js)
``` javascript
app.post('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if(err) throw err;
		console.log("Connected!");
		var dbo = db.db("mydb");
		var query = { 
			$where: "this.name === '" + req.body.name_field + "'"
		};
		dbo.collection("customers").find(query).toArray(function(err, result){
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
		db.close();
	});
});
```

### Running the exploit

#### Starting the Mongo server

Download the mongo database server from [docs.mongodb.com](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) and follow the steps to set it up.

#### Starting the NodeJS server

After downloading the [source](https://github.uconn.edu/jrs12014/OSC-UConn/tree/master/WriteUps/SQLInjections/mongoDB) and installing the packages, you can run the server by doing:

- `foo@bar:~$ cd /path/to/mongoexploit.js/`
- `foo@bar:~$ node createdb.js`
- `foo@bar:~$ node mongoexploit.js`

#### Payload Procedure
- Go to `localhost:8080` in your web browser
- Type `'; return ''=='`
	- This will return the contents of the entire collection
- Type `'; while(true){}'`
  - This will run an infinite loop

### Why is this present?

This takes advantage of the where operator to return additional statements. Without sanitizing user input, any mongo command could be run.


# Searching for vulnerability

## SQL syntax

The syntax of the vulnerable code is a string concatenated to user input. Any way to format the SQL command into a string with user input will lead to a vulnerability. Here are some examples:

```cmd = "SELECT"+user_input;``` or ``` "SELECT * FROM * WHERE username =" + user_input; ```

```cmd = ("SELECT, {0}!".format(user_input))```

```cmd = sql_stmnt.concat(user_input); ```

These commands could also be put directly in the query call:

```con.query("SELECT "+ user_input, functionCall());```

```con.query("SELECT ?",[user_input], functionCall());```

## Mongo (NoSQL) syntax
Similar concatinations techniques can be used in the query variable:

```query = {$where: "this.name === '" + req.body.name_field + "'"};```

Query commands may also be run directly in the find command:

```dbo.collection("customers").find({$where: "this.name === '" + req.body.name_field + "'"}).toArray(function(err, result){});```