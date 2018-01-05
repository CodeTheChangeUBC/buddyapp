const client = require('./../server.js');


/*
TODO json username, auth_token, device_id
*/

// TODO LOL 20 char VARCHAR 255 for auth_token

// TODO move to server.js???????????????????????????????????????????????????????????????
var sqlite3 = require('sqlite3').verbose(); // why verbose
var db = new sqlite3.Database('PersistentLogin.db');


module.exports.loggedin = function (req,res) {
  var login = {
    "username": req.body.username,
    "auth_token": req.body.auth_token,
    "device_id": req.body.device_id
  }

  var old_auth_token;

  // TODO verify username auth_token, device_id
  // retrieving old_auth_token
  db.all("SELECT * FROM PersistentLogin WHERE username = (?)", [login.username], (err, rows) => {
    if (err) {
      throw err;
    }
    old_auth_token = rows.auth_token;
  });


  // if the auth_token sent by user is valid, generate new auth_token and return
  if (old_auth_token.equals(login.auth_token)){
    // generate new auth_token and update database
    var new_auth_token = randString();
    db.run("UPDATE PersistentLogin SET auth_token = (?) WHERE username = (?)"[new_auth_token, login.username]);
    // return new_auth_token
    res.json({
      auth_token: new_auth_token
    })
  } else {
    // TODO lmao
    res.json({
      message:"fail"
    })
  }


}




// generate random string 20 chars
function randString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
