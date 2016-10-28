var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');


var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());


var uri = 'mongodb://admin:admin@ds137267.mlab.com:37267/mobileapp';

mongodb.MongoClient.connect(uri, (err, database) => {
  if (err) return console.log(err)
  myDB = database
  app.listen(port, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
 
  myDB.collection('users').find().toArray(function(err, docs){
		//console.log(docs);
		res.json(docs);
	});
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.post('/login',function (req,res) {
	myDB.collection('users').findOne({u_name: req.body.u_name,password: req.body.password}, function(err,doc){
		if(err) throw err;
		console.log(doc);
		res.json(doc);
	})
})

app.post('/register',function (req,res) {
	console.log(req.body);
	myDB.collection('users').save(req.body, function(err,doc){
		res.json(doc);
	});
})

app.get('/getDetails',function (req,res) {
	console.log(req.body);
	myDB.collection('details').find().toArray(function(err, docs){
		res.json(docs);
	});
})

app.post('/saveDetails',function (req,res) {
	console.log(req.body);
	myDB.collection('details').save(req.body, function(err,doc){
		res.json(doc);
	});
})