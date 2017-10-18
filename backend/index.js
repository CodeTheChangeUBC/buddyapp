const express=require("express");
var bodyParser=require('body-parser');

const app = express();

var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

//test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
    }
);


/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
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

function sendResponse(response, returnString) {
	console.log("callback execute");
	response.end(returnString);
}

