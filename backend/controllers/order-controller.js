/*
* given a starting location, sorts users in the order they should be dropped off
* @param startLocation: starting location
* @param users: {Array<User>} array of users
*/
function sortDropoffs(startLat, startLon, users) {
    order = []; // array of persons
    remainingUsers = users;
    newLat = startLat;
    newLon = startLon;
    while (remainingUsers.length > 1) {
        distances = [];
        for (var i = 0; i < remainingUsers.length; i++) {
            distances.push({
                userID: remainingUsers[i],
                distance: getDistance(startLat, startLon, remainingUsers[i].destLat, remainingUsers[i].destLong)
            })
        }

        distances.sort((a, b) => {
            return a.distance > b.distance;
        });

        if (someoneRemaining(remainingUsers, users, getUser(user, distances[0].userID))) {
            order.push(popUser(remainingUsers, distances[0].userID));
            newLat = getUser(users, distance[0].userId).destLat;
            newLon = getUser(users, distance[0].userId).destLon;
        } else {
            order.push(popUser(remainingUsers, distances[1].userID));
            newLat = getUser(users, distance[1].userId).destLat;
            newLon = getUser(users, distance[1].userId).destLon;
        }
    }
    order.push(remainingUsers[0]);
    return({persons: order, startLat: startLat, startLon: startLon});
}

//---------------------------------------Helper Methods--------------------------------

/*
* return distance between destA and destB
*/
function getDistance(destLatA, destLonA, destLatB, destLonB) {
    return Math.sqrt(Math.pow(destLatA - destLatB, 2) + Math.pow(destLonA - destLonB, 2))
}

/*
* get user given userId
*/
function getUser(users, userId) {
    for (user : users) {
        if (user.userId == userId) {
            return user;
        }
    }
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
        if (remainingUsers[i].userId != toPop.userId && remainingUsers[i].walkAlone) {
            remaining = true;
            break;
        }
    }
    return remaining;
}

/*
* pops the user from remainingUsers
* @param remainingUsers: array of users
* @param toPop:
*/
function popUser(remainingUsers, toPop) {
    index = remainingUsers.indexOf(toPop);
    return remainingUsers.splice(index, 1);
}
