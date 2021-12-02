DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  username TEXT NOT NULL,
  profile_picture_url TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  bio TEXT
);

