# BuddyApp

Moonwalk, a mobile application, will help students form pairs or groups so that they can walk home together after dark. Since many
students who prefer to work at the library feel unsafe walking alone on campus, this app would allow them to conveniently meet others
who are taking a similar route at a similar time, and contribute together to making UBC a safer campus for everyone.

# FAQ/Troubleshooting:
1) Google maps not loading? Or any google type errors
- run: npm install @types/google-maps --save

**API Calls**

### Register New User
---
    Adds a new user to the database based off the provided username, pw_hash, first_name, last_name, gender, email.

```no-highlight
endpoint: POST to /api/register

Post body format: (data to be send in "<>")
{
  "username":<username>,
  "pw_hash":<password hashed>,
  "first_name":<first name>,
  "last_name":<last name>,
  "gender":<gender>,
  "email":<email>
}
```

### Authenticate User
Provides access to the API by providing username and pw_hash

```no-highlight
endpoint: POST to /api/authenticate

Post body format: (data to be send in "<>")
{
  "username":<username>,
  "pw_hash":<password hashed>,
}
```

### Searches for a Match
Searches the a match given the user settings. Requires access from autheneticate.

```no-highlight
endpoint: POST to /api/search

Post body format: (data to be send in "<>")
{
  "user_id":<user id>,
  "gender":<gender>,
  "gender_pref":<gender preference>,
  "time_start":<trip start time window, time start>,
  "time_end":<trip start time window, time end>,
  "time_created":<time created of search>,
  "size":<group size>,
  "start_loc":<start location>,
  "dest_lat":<destination latitude>,
  "dest_long":<destination longitude>,
  "identifying":<identifying information>,
  "walk_alone":<willing to walk alone boolean>
}
```
