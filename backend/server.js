var express    = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var router = express.Router();

// test route
router.get('/', function(req, res) {
  res.json({ message: 'welcome to our upload module apis' });
});

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
app.use('/api', router);
app.listen(5000);

/*
const express = require('express');
const app = express();

var port = 8080;

const pg = require('pg');

const config = {
  host: 'moonwalk-1.postgres.database.azure.com',
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: process.env.USER,
  password: process.env.PASS,
  database: 'postgres',
  port: 5432,
  ssl: true
};

const client = new pg.Client(config);

client.connect(err => {
  if (err) throw err;
//else { queryDatabase(); }
});

app.listen(port, function(){
  console.log("Express app listening on port " + port);
});


app.get('/test', function(request, response){
  console.log("New GET request");
  queryDatabase(response, sendResponse);
});



function queryDatabase(response, callback){
  console.log(`Running query to PostgreSQL server: ${config.host}`);

  var JSONString = "";

  const query = 'SELECT * FROM inventory;';

  client.query(query)
    .then(res => {
    const rows = res.rows;

  rows.map(row => {
    JSONString += JSON.stringify(row);
  //console.log(returnString);
  //console.log(`Read: ${JSON.stringify(row)}`);
});

  callback(response, JSONString);
  //process.exit(); NOTE this terminates the server

})
.catch(err => {
    console.log(err);
});

}

function sendResponse(response, returnString){
  console.log("callback execute");
  response.end(returnString);

}
*/
