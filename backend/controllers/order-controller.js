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
    canWalkAlone: false
  },
  "B": {
    dest: {
      lat: 50,
      lon: 50
    },
    canWalkAlone: true
  },
  "C": {
    dest: {
      lat: 60,
      lon: 60
    },
    canWalkAlone: true
  },
  "D": {
    dest: {
      lat: 70,
      lon: 70
    },
    canWalkAlone: false
  }
}

function getDistance(destA, destB) {
  return Math.sqrt(Math.pow(destA.lat - destB.lat, 2) + Math.pow(destA.lon - destB.lon, 2))
}

function someoneRemaining(remainingUsers, users, toPop) {
  remaining = false;
  for (var i = 0; i < remainingUsers.length; i++) {
    if (remainingUsers[i] != toPop && users[remainingUsers[i]].canWalkAlone) {
      remaining = true;
      break;
    }
  }
  return remaining;
}

function popUser(remainingUsers, toPop) {
  index = remainingUsers.indexOf(toPop);
  return remainingUsers.splice(index, 1)[0];
}


function sortDropoffs(startLocation, users) {
    start = startLocation

    order = [];
    remainingUsers = Object.keys(users)
    while (remainingUsers.length > 1) {

      distances = [];
      for (var i = 0; i < remainingUsers.length; i++) {
        distances.push([remainingUsers[i], getDistance(start, users[remainingUsers[i]].dest)])
      }

      distances.sort((a, b) => {
        return a[1] > b[1]
      });

      if (someoneRemaining(remainingUsers, users, distances[0][0])) {
        order.push(popUser(remainingUsers, distances[0][0]))
        start = users[distances[0][0]].dest
      } else {
        order.push(popUser(remainingUsers, distances[1][0]))
        start = users[distances[1][0]].dest
      }
    }
    order.push(remainingUsers[0])
    console.log(order)
}

sortDropoffs(startLocation, users)
