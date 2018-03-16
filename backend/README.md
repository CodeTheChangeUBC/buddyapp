**Description of what each function does**
- person.js: contains the constructor for a person object
- score.js: computes the score that measures the goodness of a match between two people
- search.js:
- server.js:
- controller/get-search-controller.js: grabs search data from db and returns an array of User objects populated with score data
- controller/order-controller.js: takes array of users, sorts them based on the order in which they should be dropped off
- controller/persistent-login-controller.js:
- controller/trip-put-controller.js: create a row in the trip table and notifies users
- controller/user-put-controller.js: creates a new row in the user table
