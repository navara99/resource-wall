DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY NOT NULL,
  password TEXT NOT NULL,
  username TEXT NOT NULL,
  image_url TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  bio TEXT
);

