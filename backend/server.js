const pg = require('pg');
const express=require("express");
var bodyParser=require('body-parser');

const app = express();

const   connection = {
		host	: 'moonwalk-1.postgres.database.azure.com',
		user: process.env.USER,
		password: process.env.PASS,
		database: 'postgres',
		port: 5432,
		ssl: true
};


const client = new pg.Client(connection);

client.connect(function(err){
	if(!err) {
		    console.log("Database is connected");
	} else {
		    console.log("Error while connecting with database");
	}
});

module.exports = client;

//Require all of our controllers
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var searchController=require('./controllers/search-controller');

app.get('/Registration/:name', function(req,res){

  console.log(req.params.name);
  queryDatabase(res, sendResponse);
}

app.get('/Login/:name', function(req,res){

  console.log(req.params.name);
  queryDatabase(res, sendResponse);
}

app.get('/Login/:password', function(req,res){

  console.log(req.params.password);
  queryDatabase(res, sendResponse);
}

function queryDatabase(response, callback){
  console.log(`Running query to PostgreSQL server: ${config.host}`);


/* routes to handle api requests using above controllers*/
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/api/search',searchController.search);
app.listen(8012);


function queryDatabase(response, callback){
	console.log("Running query to PostgreSQL server: ${config.host}");

		var JSONString = "";

		  const query = 'SELECT * FROM inventory;';

		  client.query(query)
		      .then(res => {
			      const rows = res.rows;
			      rows.map(row => {
				      JSONString += JSON.stringify(row);
				      //console.log(returnString);
				      //console.log('Read: ${JSON.stringify(row)}');
			      });

			      callback(response, JSONString);
			      //process.exit(); NOTE this terminates the server

			})
			.catch(err => {
				console.log(err);
			});
}
