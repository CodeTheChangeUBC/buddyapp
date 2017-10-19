var express = require('express');
var bodyParser = require('body-parser');
var app = express();

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.bodyParser());
// app.use(app.router);

client.connect(err => {
  if (err) throw err;
});

app.listen(port, function(){
  console.log("Express app listening on port " + port);
});

app.get('/test', function(request, response){
  console.log("New GET request");
  queryDatabase(response, sendResponse);
});

app.post('/register', function(request, response){
  console.log("New POST register request");
  var table = "users"
  // probably better way to structure this
  var additionalData = [["salt", "0", "bitv"]]
  writeDatabase(request, response, table, additionalData);
});

app.post('/login', function(request, response){
  console.log("New POST login request");
  checkLogin(request, response);
});

function queryDatabase(response, callback){
  console.log("Running query to PostgreSQL server: ${config.host}");

  var JSONString = "";

  const query = 'SELECT * FROM inventory;';

  client.query(query)
    .then(res => {
      const rows = res.rows;

      rows.map(row => {
        JSONString += JSON.stringify(row);
      });
      callback(response, JSONString);
    })
    .catch(err => {
      console.log(err);
    });
}

// Define mapping of JSON keyword to database field
var mapping = {
  "username" : {
    "value": "username",
    "type" : "varchar"
  },
  "pwHash" : {
    "value": "pw_hash",
    "type" : "bitv"
  },
  // TODO - is this the best way to deal with names?
  "firstName" : {
    "value": "first_name",
    "type" : "varchar"
  },
  "lastName" : {
    "value": "last_name",
    "type" : "varchar"
  },
  "gender" : {
    "value": "gender",
    "type" : "varchar"
  },
  "email" : {
    "value": "email",
    "type" : "varchar"
  },
}

// accepts a value as a string and a type, and produces a string
// that will be accepted by postgreSQL for the given type
function typeVar(value, type) {
  switch(type) {
    case "varchar":
      // postgreSQL VARCHAR
      return "\'" + value + "\'";
    case "bitv":
      // postgreSQL BIT VARYING
      // byte varying are of the form E'x<hex value>'
      // TODO - is this how the frontend will be sending this data?
      // TODO - some sort of data sanitization
      return "E\'x" + value + "\'";;
    
    default:
      console.log("Error: type " + type + " not valid");
      return "";
  }
}

function writeDatabase(request, response, table, additionalData){
  var columns = [];
  var values = [];
  for (var key in mapping) {
    if (request.body[key] != undefined) {
      columns.push(mapping[key]["value"]);
      values.push(typeVar(request.body[key], mapping[key]["type"]));
    }
  }
  
  // TODO - fix salt, for now just use 0
  for (var i = 0; i < additionalData.length; i++) {
    var data = additionalData[i];  
    columns.push(data[0]);
    values.push(typeVar(data[1], data[2]));
  }
  
  var query = "INSERT INTO " + table + " (" + columns.join(',') + ")\n" +
    "VALUES (" + values.join(",") + ")";
    
  console.log(query);
  
  client.query(query).then(res => {
      // need to check for error?  or already handled?
      response.sendStatus(200);
    }).catch(err => {
      console.log(err);
      response.sendStatus(500);
    });
}

function checkLogin(request, response) {
  var username = "";
  if (request.body["username"] != undefined) {
    username = request.body["username"];
  } else {
    console.log("username not provided");
    response.status(500).send("username not provided");
  }
  
  var pwHash = "";
  if (request.body["pwHash"] != undefined) {
    pwHash = request.body["pwHash"];
  } else {
    console.log("password hash not provided");
    response.status(500).send("password hash not provided");
  }
  
  // todo - use mapping
  var querySelect = "SELECT * FROM users\n" + 
    "WHERE username = " + typeVar(username, "varchar") + "\n" +
    "and pw_hash = " + typeVar(pwHash, "bitv");
  console.log(querySelect);
  client.query(querySelect).then(res => {
      var rows = res.rows;
      if (rows.length == 0) {
        console.log("no match")
        response.status(400).send("invalid username or password");
      } else if (rows.length > 1) {
        console.log("too many matches; username was not unique");
        response.status(500).send("non-unique match");
      } else {
        // valid request, return the user id
        response.status(200).json({"id":rows[0]["id"]})
      }
    }).catch(err => {
      console.log(err);
      response.sendStatus(500);
    });
}

function sendResponse(response, returnString){
  console.log("callback execute");
  response.end(returnString);
}
