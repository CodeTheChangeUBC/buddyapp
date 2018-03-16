**Description of what each function does**
- person.js: contains the constructor for a person object
- score.js: computes the score that measures the goodness of a match between two people
- search.js:
- server.js:
- controller/get-search-controller: grabs search data from db and returns an array of User objects populated with score data
- controller/order-controller: takes array of users, sorts them based on the order in which they should be dropped off
- controller/persistent-login-controller:
- controller/trip-put-controller: create a row in the trip table and notifies users
