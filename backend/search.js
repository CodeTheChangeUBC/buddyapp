"use strict";

/** 
 * Constructor for a user
 * @param {Number} userId
 * @param {0, 1} walkAlone
 * @param {Number} minSize
 * @param {Array<Number>} data
 */
function User(userId, walkAlone, minSize, data){
	this.userId = userId;
	this.walkAlone = walkAlone;
	this.size = minSize;
	this.data = data;
}

/** 
 * Returns an Array of User objects representing a group. Can be an empty Array if no acceptable matches are found.
 * Does not modify the full array of users. (They must be removed later)
 * @param {Array<User>} arr
 * @param {Number} threshold
*/
function searchMatrix(arr, threshold){
	var maxFound = threshold;
	var user1 = null;
	var user2 = null;
	var ind1 = null;
	var ind2 = null;
	var group = [];
	//~n^2/2 pass to find first pair
	for(var i = 0; i < arr.length; i++) {
		for(var o = i+1; o < arr.length; o++){
			var score = arr[i].data[o];
				if (score > maxFound && (arr[i].walkAlone == 1 || arr[o].walkAlone == 1)){
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


//---------------------------------------Helper Methods--------------------------------

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

//Checks if the group contains at least one user that can walk alone
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

//Removes individuals until all of the min group sizes are satisfied
function checkSize(array){
	//Sort in order of min group sizes
	array.sort(function(a,b){
		return a.size-b.size;
	})
	//Looking at the last index (Largest min group size), check if the group is valid.
	//If it is valid, return.
	//else remove the last element and keep checking.
	for(var i = array.length - 1; i > -1; i--){
		if(array[i].size <= i+1){
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

module.exports = {
	searchMatrix,
	User,
	arrayContains,
	checkConditions,
	checkWalkAlone,
	checkSize,
	removeIndex,
	minsAcross
}