Login API Call
Post body format: (data to be send in "<>")
{
  "username":<username>,
  "pw_hash":<password hashed>,
  "first_name":<first name>,
  "last_name":<last name>,
  "gender":<gender>,
  "email":<email>
}

-------------------------------------------

Register API Call
Post body format: (data to be send in "<>")
{
  "username":<username>,
  "pw_hash":<password hashed>,
}

-------------------------------------------

Search API Call
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