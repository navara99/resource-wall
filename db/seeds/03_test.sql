INSERT INTO resources (user_id, title, desription, url, media_url, is_video, category_id, is_private)
VALUES
  (1, "resource 1", "resource 1 description", "resource 1 url", "resource 1 media url", false, 1, false),
  (1, "resource 2", "resource 2 description", "resource 2 url", "resource 2 media url", true, 2, true),
 ;

INSERT INTO likes (user_id, resource_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 2),
  (5, 2),
 ;

INSERT INTO comments (user_id, resource_id, comment)
VALUES
  (1, 2, "comment for id 2"),
  (2, 1, "comment for id 1 from user 2"),
  (3, 1, "comment for id 1 from user 3"),
  (4, 1, "comment for id 1 from user 4"),
  (5, 1, "comment for id 2"),
 ;

INSERT INTO ratings (user_id, resource_id, rating)
VALUES
  (1, 2, 0),
  (2, 2, 0),
  (3, 1, 3),
  (4, 1, 3),
  (5, 1, 5),
 ;
