const pg = require('pg');
const express=require("express");
var bodyParser=require('body-parser');

const app = express();

const   connection = {
<<<<<<< HEAD
    host    : 'moonwalk-1.postgres.database.azure.com',
user: process.env.USER,
password: 'MoonPostgreSQL123)(*',
database: 'postgres',
port: 5432,
ssl: true
=======
    host	: 'moonwalk-1.postgres.database.azure.com',
    user: process.env.USER,
    password: process.env.PASS,
    database: 'postgres',
    port: 5432,
    ssl: true
>>>>>>> 297fb7a8... modified tests and added date object
};


const client = new pg.Client(connection);

client.connect(function(err){
<<<<<<< HEAD
               if(!err) {
               console.log("Database is connected");
               } else {
               console.log("Error while connecting with database");
               }
               });
=======
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});
>>>>>>> 297fb7a8... modified tests and added date object

module.exports = client;

//Require all of our controllers
var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var searchController=require('./controllers/search-controller');

//So we can parse body data of http requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

//test route
router.get('/', function(req, res) {
<<<<<<< HEAD
           res.json({ message: 'welcome to our upload module apis' });
           }
           );
=======
        res.json({ message: 'welcome to our upload module apis' });
    }
);
>>>>>>> 297fb7a8... modified tests and added date object


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
<<<<<<< HEAD
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
=======
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
>>>>>>> 297fb7a8... modified tests and added date object
}

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAsn8mQ2wJcM2jQWD8ByBQ1_0aoW4gARP0'
});

// Geocode an address.
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});
