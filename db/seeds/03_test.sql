INSERT INTO users (email, password, username, image_url, first_name, last_name)
VALUES
  ('email1', 'password1', 'username1', NULL, 'first_name1', 'last_name1'),
  ('email2', 'password2', 'username2', NULL, 'first_name2', 'last_name2'),
  ('email3', 'password3', 'username3', NULL, 'first_name3', 'last_name3'),
  ('email4', 'password4', 'username4', NULL, 'first_name4', 'last_name4'),
  ('email5', 'password5', 'username5', NULL, 'first_name5', 'last_name5')
 ;

INSERT INTO resources (user_id, title, description, url, media_url, is_video, category_id, is_private)
VALUES
  (1, 'resource 1', 'resource 1 description', 'resource 1 url', 'resource 1 media url', false, 1, false),
  (1, 'resource 2', 'resource 2 description', 'resource 2 url', 'resource 2 media url', true, 2, true)
 ;

INSERT INTO likes (user_id, resource_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (5, 2)
 ;

INSERT INTO comments (user_id, resource_id, comment)
VALUES
  (1, 2, 'comment for id 2'),
  (2, 1, 'comment for id 1 from user 2, comment for id 1 from user 2, comment for id 1 from user 2, comment for id 1 from user 2'),
  (3, 1, 'comment for id 1 from user 3'),
  (4, 1, 'comment for id 1 from user 4'),
  (5, 2, 'comment for id 2')
 ;

INSERT INTO ratings (user_id, resource_id, rating)
VALUES
  (1, 2, 0),
  (2, 2, 0),
  (3, 1, 3),
  (4, 1, 3),
  (5, 1, 5)
 ;
