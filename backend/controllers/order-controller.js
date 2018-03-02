// startlocation, user:destination, user:canWalkAlone

startLocation = {
    lat: 30,
    lon: 30
}

users = {
  "A": {
    dest: {
      lat: 40,
      lon: 40
    },
    walkAlone: false
  },
  "B": {
    dest: {
      lat: 50,
      lon: 50
    },
    walkAlone: true
  },
  "C": {
    dest: {
      lat: 60,
      lon: 60
    },
    walkAlone: true
  },
  "D": {
    dest: {
      lat: 70,
      lon: 70
    },
    walkAlone: false
  }
}

/*
* return distance between destA and destB
*/
function getDistance(destA, destB) {
  return Math.sqrt(Math.pow(destA.lat - destB.lat, 2) + Math.pow(destA.lon - destB.lon, 2))
}

/*
* return whether someone can be popped, based on whether there is someone remaining who can walk alone
* @param remaningUsers: the remaining users
* @param users: the original users (in order to access canWalkAlone information)
* @param toPop: the user we want to pop (but aren't sure whether we can)
*/
function someoneRemaining(remainingUsers, users, toPop) {
  remaining = false;
  for (var i = 0; i < remainingUsers.length; i++) {
    if (remainingUsers[i] != toPop && users[remainingUsers[i]].walkAlone) {
      remaining = true;
      break;
    }
  }
  return remaining;
}

/*
* pops the user from remainingUsers
*/
function popUser(remainingUsers, toPop) {
  index = remainingUsers.indexOf(toPop);
  return remainingUsers.splice(index, 1)[0];
}

/*
* given a starting location, sorts users in the order they should be dropped off
* @param startLocation: starting location
* @param users: users in a group
*/
function sortDropoffs(startLocation, users) {
    start = startLocation

    order = [];
    remainingUsers = Object.keys(users)
    while (remainingUsers.length > 1) {

      distances = [];
      for (var i = 0; i < remainingUsers.length; i++) {
        distances.push({
          userID: remainingUsers[i],
          distance: getDistance(start, users[remainingUsers[i]].dest)
        })
      }

      distances.sort((a, b) => {
        return a.distance > b.distance
      });

      if (someoneRemaining(remainingUsers, users, distances[0].userID)) {
        order.push(popUser(remainingUsers, distances[0].userID))
        start = users[distances[0].userID].dest
      } else {
        order.push(popUser(remainingUsers, distances[1].userID))
        start = users[distances[1].userID].dest
      }
    }
    order.push(remainingUsers[0])
    console.log(order)
}

/* for testing */
sortDropoffs(startLocation, users)
