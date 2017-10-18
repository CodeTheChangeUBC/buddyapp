const express=require("express");
var bodyParser=require("body-parser");

const app = express();

var authenticateController=require("./controllers/authenticate-controller");
var registerController=require("./controllers/register-controller");

app.use(body.Parser.urlencoded({extend:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.post('/api/register', registerController.register);
app.post('/api/authenticate', authenticateController.authenticate);

app.listen(8012);
