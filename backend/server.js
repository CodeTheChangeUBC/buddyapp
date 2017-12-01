const pg = require('pg');
const express=require("express");
var bodyParser=require('body-parser');

const app = express();

const connection = {
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

//So we can parse body data of http requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

//test route
router.get('/', function(req, res) {
        res.json({ message: 'welcome to our upload module apis' });
    }
);

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

<<<<<<< HEAD
//Returns an array of numbers representing a group. Can be empty if no acceptable matches are found.
//Each number in the return is the row index of the selected individual in the maintained search matrix.
//Does not modify the search matrix
function searchMatrix(matrix, threshold){
	var maxFound = threshold;
	var row = -1;
	var col = -1;
	var group = [];
	//~n^2/2 pass to find first pair
	for (var i = 0; i < matrix.length; i++) {
		for(var o = i+1; o < matrix[i].length; o++){
				if (maxFound < matrix[i][o]){
						maxFound = matrix[i][o];
						row = i;
						col = o;
						}
				}
		}
	//Check if we actually found a valid pair
	if((col != -1 || row != -1) && maxFound > threshold){
		//Add our new members to the group array
		group.push(col);
		group.push(row);
		//Make 1d array of the mins across the 2 selected individuals and search for next, ignoring already added indexes
		var mins = minsAcross(matrix[row], matrix[col]);
		//Keep finding more individuals until there are no more that pass the threshold.
		var bestFound = threshold;
		var indexFound = -1;
		var noMore = false;
		for(int o = 0; o < mins.length; o++){
			for(int i = 0; i < mins.length; i++){
				if(!arrayContains(group, i)){
					if(mins[i] > bestFound){
						bestFound = mins[i];
						indexFound = i;
					}
				}
			}
			if(bestFound == threshold){
				return checkConditions(group);
			}
			if(bestFound > threshold){
				mins = minsAcross(mins, matrix[indexFound]);
				group.push(indexFound);
				//reset
				bestFound = threshold;
				indexFound = -1;
			}
		}
	}
	//If we didn't find a valid pair, return empty array
	return group;
}

//Returns true if given array contains number.
//Returns false otherwise
function arrayContains(array, number){
	for(int i = 0; i < array.length; i++){
		if(array[i] === number){
			return true;
		}
	}
	return false;
}

function checkConditions(array){
	//TODO: Check conditions of selected individuals and return a refined array
}

//Takes 2 arrays of equal length and returns a single array of the mins across both arrays
function minsAcross(row1, row2){
	var ret = [];
	for(int i = 0; i < row1.length; i++){
		ret.push(Math.min(row1[i], row2[i]));
	}
	return ret;
}

//Remove a row from a 2d array
function removeRow(array, row){
		array.splice(row, 1);
		return array;
}
//remove a col from a 2d array
function removeCol(array, col){
	for(var i = 0; i < array.length; i++){
		array[i].splice(col, 1);
	}
}
=======
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
>>>>>>> master
