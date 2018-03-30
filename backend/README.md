**Description of what each function does**
- person.js: contains the constructor for a person object
- score.js: computes the score that measures the goodness of a match between two people
- search.js: if a group if found, returns an array of person objects representing that group; else, returns empty array
- threshold.js: finds the minimum threshold rating for matching people, given some total number of people

- server.js:
- controller/get-search-controller.js: grabs search data from db and returns an array of User objects populated with score data
- controller/order-controller.js: takes array of users, sorts them based on the order in which they should be dropped off
- controller/persistent-login-controller.js:
- controller/trip-poll-controller.js: checks whether a user has been put in a group
- controller/trip-put-controller.js: create a row in the trip table and notifies users
- controller/user-put-controller.js: creates a new row in the user table

**Objects/Types**
Person: Object representing a current user
	- <Number> userID
	- <Number> gender (encoded)
	- <String> timeStart (UTC timestamp)
	- <String> timeEnd (UTC timestamp)
	- <Number> startLat (where user begins)
	- <Number> startLong (where user begins)
	- <Number> destLat (intended user destination)
	- <Number> destLong (intended user destination)
	- <Number> walkAlone (boolean, if user is OK with walking alone)
	- <Number> genderPref
	- <Number> minSize (minimum group size person is OK with)
	- <Array<Number>> data (contains compatibility score of this person with all other people in array)

**Numerical translations**

Users Table:
gender{
  0 : Other
  1 : Male
  2 : Female
 }

Trip Table:
status{
  0 : Trip Pending
  1 : Trip Ongoing
  2 : Trip Cancelled
  3 : Trip Complete
}

Search Table:
gender_pref{
  0 : No Preference
  1 : Male
  2 : Female
}

walk_alone{
  0 : Not willing to walk alone.
  1 : Willing to walk alone.
}

status{
  1 : Search Ongoing
  2 : Search Cancelled
  3 : Search Complete
}

 