const client = require('./../server.js');

const socket = require('socket.io');
const io = socket(server);

// map of connected users, so we can send the correct trip to the correct user
var users = {};

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log(socket.id);

  // have user tell us who they are
  socket.on('login', function(data){
    users[data.username] = socket.id;
  });

}

/*
  function to be called when a trip has been made
  param trip
    json object representing a match (trip)
*/
function tripFound(trip) {
  // loop through each user in the trip and inform them that a trip has been found
  for (var i = 0; i < trip.user_ids.length; i ++) {
    io.sockets.socket(users[trip.user_ids[i]]).emit('tripFound', trip);

  }
}
