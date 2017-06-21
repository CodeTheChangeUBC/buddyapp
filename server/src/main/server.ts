import * as restify from '../../node_modules/restify';
import * as fs from 'fs';

export let server = restify.createServer({
  name: "Houston",
  url: 'https://localhost:443',
  key: fs.readFileSync('./https/server.key'),
  certificate: fs.readFileSync('../https/server.crt')
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.fullResponse());

server.listen(443, function() {
  console.info('Listening for requests');
});

server.get('/', function(req, res, next) {
  console.info("Server started");
});
