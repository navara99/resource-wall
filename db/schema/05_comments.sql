DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) DELETE ON CASCADE,
  resource_id INTEGER REFERENCES resources(id) DELETE ON CASCADE,
  timestamp DATE NOT NULL
);