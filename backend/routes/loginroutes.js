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
else { console.log("connected");
  queryDatabase(response, sendResponse);}
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

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
      });
    }
  });
}

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if([0].password == password){
          res.send({
            "code":200,
            "success":"login sucessfull"
          });
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
          });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
        });
      }
    }
  });
}
