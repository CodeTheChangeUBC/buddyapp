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

//Returns an array of numbers representing a group. Can be empty if no acceptable matches are found.
//Each number in the return is the row index of the selected individual in the maintained search matrix.
//Does not modify the search matrix
function searchMatrix(arr, threshold){
	var maxFound = threshold;
	var user1 = null;
	var user2 = null;
	var group = [];
	//~n^2/2 pass to find first pair
	for (var i = 0; i < arr.length; i++) {
		for(var o = i+1; o < arr.length; o++){
			//Not sure if I am accessing the data properly
			var score = arr[i].data[o];
				if (score > maxFound){
						maxFound = score;
						user1 = arr[i];
						user2 = arr[o];
					}
				}
		}
	//Check if we actually found a valid pair
	if(user1 !== null && user2 !== null && maxFound > threshold){
		//Add our new user objects to the group array
		group.push(user1);
		group.push(user2);
		//Make 1d array of the mins across the 2 selected individuals and search for next, ignoring already added indexes
		var mins = minsAcross(user1.data, user2.data);
		//Keep finding more individuals until there are no more that pass the threshold.
		var bestFound = threshold;
		var indexFound = -1;
		for(var o = 0; o < mins.length; o++){
			for(var i = 0; i < mins.length; i++){
				if(mins[i] > bestFound){
					//Make sure this user isn't already in our group
					if(!arrayContains(group, arr[i].userId)){
						bestFound = mins[i];
						indexFound = i;
					}
				}
			}
			if(bestFound == threshold){
				return checkConditions(group);
			}
			if(bestFound > threshold){
				mins = minsAcross(mins, arr[indexFound].data);
				group.push(arr[indexFound]);
				//reset
				bestFound = threshold;
				indexFound = -1;
			}
		}
	}
	//If we didn't find a valid pair, return empty array
	return group;
}

//Returns true if given array of user objects contains the given userID.
//Returns false otherwise
function arrayContains(array, uID){
	for(var i = 0; i < array.length; i++){
		if(array[i].userId == uID){
			return true;
		}
	}
	return false;
}

//Checks validity of group and returns refined group ready to be deployed
function checkConditions(array){
	return checkWalkAlone(checkSize(array));
}

function checkWalkAlone(array){
	if(array.length == 1 || array.length == 0){
		return new Array();
	}
	else{
		for(var i = 0; i < array.length; i++){
			//If someone can walkAlone return the array.
			if(array[i].walkAlone == 1){
				return array;
			}
		}
		//If the for loop finishes without finding anyone, discard the group.
		return new Array();
	}
}

function checkSize(array){
	//Sort in order of min group sizes
	array.sort(function(a,b){
		return a.size-b.size;
	})
	//Looking at the last index (Largest min group size), check if the group is valid.
	//If it is valid, return.
	//else remove the last element and keep checking.
	for(var i = array.length - 1; i > -1; i--){
		if(array.[i].size <= i+1){
			return array;
		}
		else{
			removeIndex(array, i);
		}
	}
	return array;
}

//Removes element of given array at index specified 
function removeIndex(array, index){
	array.splice(index, 1);
}

//Takes 2 arrays of equal length and returns a single array of the mins across both arrays
function minsAcross(row1, row2){
	var ret = [];
	for(var i = 0; i < row1.length; i++){
		ret.push(Math.min(row1[i], row2[i]));
	}
	return ret;
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
