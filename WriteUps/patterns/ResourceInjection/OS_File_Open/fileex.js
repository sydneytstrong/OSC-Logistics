var express = require('express'); //expressJS web framework
var app = express();
var path = require('path'); //path package finds current directory
app.use(express.urlencoded({extended: true}));
var fs = require('fs'); //fs standard file library
var file = "";

//Initially sends the html file with the form embedded
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname+'/demofile1.html'));
});

//handles recieving the form data and responding with the file data
app.post('/', function(req, res){
	file = req.body.name_field;
	fs.readFile(file, function(err, data){
		res.send(data + err);
	})
});

app.listen(process.env.port || 8080);
console.log('Running on port 8080');
