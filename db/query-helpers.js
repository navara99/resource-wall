const defaultProfilePicUrl = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

const getFirstRecord = (result) => result.rows[0];

const assignProfilePic = (userInfo, columnName) => {
  const { [columnName]: value } = userInfo;
  if (!value) userInfo[columnName] = defaultProfilePicUrl;
};

const queryGenerator = (db) => {

  const getUserByValue = async (columnName, value, getDefaultProfilePic) => {
    const values = [value];
    const queryString = `SELECT * FROM users WHERE ${columnName} = $1;`;
    const result = await db.query(queryString, values);
    const userInfo = getFirstRecord(result);
    if (userInfo && getDefaultProfilePic !== "1") assignProfilePic(userInfo, "profile_picture_url");
    return userInfo;
  };



  const createNewUser = async (userInfo) => {
    const { email, password, username, firstName, lastName } = userInfo;
    const values = [email, password, username, firstName, lastName];
    const queryString = `
      INSERT INTO users (email, password, username, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `;
    const result = await db.query(queryString, values);
    const newUserInfo = getFirstRecord(result);
    assignProfilePic(newUserInfo, "profile_picture_url");
    return newUserInfo;
  }

  const updateUser = async (newUserInfo) => {
    const { firstName, lastName, username, email, bio, picture, userId } = newUserInfo;
    const values = [firstName, lastName, username, email, bio, picture, userId];

    const queryString = `
    UPDATE users
    SET first_name = $1,
    last_name = $2,
    username = $3,
    email = $4,
    bio = $5,
    profile_picture_url = $6
    WHERE id = $7
    RETURNING *;
    `;

    const result = await db.query(queryString, values);
    const userInfo = getFirstRecord(result);
    assignProfilePic(userInfo, "profile_picture_url");
    return userInfo;
  }

  const updatePasswordById = async (id, password) => {
    const values = [id, password];
    const queryString = `
        UPDATE users SET password = $2 WHERE id = $1
        RETURNING *;
        `;
    const result = await db.query(queryString, values);
    const userInfo = getFirstRecord(result);
    assignProfilePic(userInfo, "profile_picture_url");
    return userInfo;
  }

  const getIdFromCategory = async (category) => {
    const value = [category];
    const queryString = `SELECT id FROM categories WHERE type = $1 LIMIT 1;`
    const result = await db.query(queryString, value);
    const category_id = getFirstRecord(result).id;
    return category_id;
  }

  const addNewResource = async ({ user_id, title, description, url, is_private, category_id, media_url, is_video }) => {
    const values = [user_id, title, description, url, media_url, is_video, category_id, is_private];
    const queryString = `
    INSERT INTO resources (user_id, title, description, url, media_url, is_video, category_id, is_private)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `
    const result = await db.query(queryString, values);
    const resourceInfo = getFirstRecord(result);
    return resourceInfo;
  }

  const getAllResources = async (user_id) => {
    const value = [user_id, false];
    const queryString = `
    SELECT
    resources.id,
    is_private,
    description,
    url,
    title,
    is_video,
    created_on,
    resources.user_id,
    media_url,
    categories.type AS category,
    category_id,
    (SELECT COUNT(likes.*) FROM likes WHERE resource_id = resources.id) AS likes,
    (SELECT COUNT(likes.*) FROM likes WHERE user_id = $1 AND resource_id = resources.id) AS is_liked
    FROM resources
    JOIN categories ON resources.category_id = categories.id
    WHERE is_private = $2;`;

    const result = await db.query(queryString, value);
    return result.rows;
  }

  const addLikeToResource = async (id, user_id) => {
    const values = [user_id, id];
    const ifLikedQuery = "SELECT * FROM likes WHERE user_id = $1 AND resource_id = $2;"
    const likes = await db.query(ifLikedQuery, values);
    const like = getFirstRecord(likes);
    if (!like) {
      const queryString = `INSERT into likes (user_id, resource_id) VALUES ($1, $2);`;
      db.query(queryString, values);
      return true;
    }
    const deleteLikeQuery = "DELETE FROM likes WHERE user_id = $1 AND resource_id = $2;";
    db.query(deleteLikeQuery, values);
    return false;
  };


  const addCommentToResource = async (id, user_id, comment) => {
    const values = [user_id, id, comment];
    const queryString = `INSERT into comments (user_id, resource_id, comment) VALUES ($1, $2, $3) RETURNING *;`;
    const result = await db.query(queryString, values);
    return getFirstRecord(result);
  };

  const addRatingToResource = async (id, user_id, rating) => {


    const values = [user_id, id];
    const ratingValues = [user_id, id, rating];
    const ifRatedQuery = "SELECT * FROM ratings WHERE user_id = $1 AND resource_id = $2;"
    const ratings = await db.query(ifRatedQuery, values);
    const rate = getFirstRecord(ratings);
    if (!rate) {
      const addRatingString = `INSERT into ratings (user_id, resource_id, rating) VALUES ($1, $2, $3);`;
      db.query(addRatingString, ratingValues);
      return true;
    }
    const updateQuery = "UPDATE ratings SET rating = $3 WHERE user_id = $1 AND resource_id = $2;";
    db.query(updateQuery, ratingValues);
    return false;
  };

  const getAllDetailsOfResource = async (resourcesId, userId) => {
    const value = [resourcesId, userId];
    const queryString = `
    SELECT
      resources.*,
      categories.type AS catergory,
      (SELECT AVG(rating) FROM ratings WHERE resource_id = $1) AS rating,
      (SELECT COUNT(rating) FROM ratings WHERE resource_id = $1) AS number_of_rating,
      (SELECT COUNT(comment) FROM comments WHERE resource_id = $1 AND comment IS NOT NULL) AS number_of_comment,
      (SELECT COUNT(id) FROM likes WHERE resource_id = $1) AS number_of_like,
      (SELECT username FROM users WHERE id = $2) AS current_username,
      comment,
      timestamp,
      x.id AS comment_user_id,
      x.username,
      x.profile_picture_url,
      y.first_name,
      y.last_name,
      y.username AS owner_username,
      (SELECT profile_picture_url FROM users WHERE id = $2) as my_profile_url,
      (SELECT COUNT(id) FROM likes WHERE user_id = $2 AND resource_id = $1) AS liked,
      (SELECT rating FROM ratings WHERE user_id = $2 AND resource_id = $1 LIMIT 1) AS rated
    FROM resources
    LEFT OUTER JOIN comments ON resources.id = comments.resource_id
    LEFT OUTER JOIN users x on comments.user_id = x.id
    LEFT OUTER JOIN users y on resources.user_id = y.id
    JOIN categories ON categories.id = resources.category_id
    WHERE resources.id = $1
    ORDER BY timestamp;`

    const result = (await db.query(queryString, value)).rows;
    result.forEach((details) => assignProfilePic(details, "profile_picture_url"));
    assignProfilePic(result[0], "my_profile_url");
    return result;
  };

  const getURLById = async (id) => {
    const values = [id];
    const queryString = `SELECT url FROM resources WHERE id = $1;`;
    const result = await db.query(queryString, values);
    const { url } = getFirstRecord(result);
    return url;
  }

  const searchResources = async (user_id, query) => {
    const value = [user_id, false, '%' + query + '%'];
    const queryString = `
    SELECT
    resources.id,
    is_private,
    description,
    url,
    title,
    is_video,
    created_on,
    resources.user_id,
    media_url,
    categories.type AS category,
    category_id,
    (SELECT COUNT(likes.*) FROM likes WHERE resource_id = resources.id) AS likes,
    (SELECT COUNT(likes.*) FROM likes WHERE user_id = $1 AND resource_id = resources.id) AS is_liked
    FROM resources
    JOIN categories ON resources.category_id = categories.id
    WHERE is_private = $2 AND (title LIKE $3 OR description LIKE $3);
    `;
    const result = await db.query(queryString, value);
    return result.rows;
  }

  const getMyResources = async (user_id) => {
    const value = [user_id, 1];
    const subquery1 = `(SELECT COUNT(likes.*) FROM likes WHERE resource_id = resources.id)`;
    const subquery2 = `(SELECT COUNT(likes.*) FROM likes WHERE user_id = $1 AND resource_id = resources.id)`
    const queryString = `
    SELECT
    resources.id,
    is_private,
    description,
    url,
    title,
    is_video,
    created_on,
    resources.user_id,
    media_url,
    categories.type AS category,
    category_id,
    ${subquery1} AS likes,
    ${subquery2} AS is_liked
    FROM resources
    JOIN categories ON resources.category_id = categories.id
    GROUP BY resources.id, categories.type
    HAVING user_id = $1 OR ${subquery2} = $2;
    ;`;

    const result = await db.query(queryString, value);
    return result.rows;
  }

  return {
    createNewUser,
    getUserByValue,
    updatePasswordById,
    updateUser,
    addNewResource,
    getIdFromCategory,
    getAllResources,
    addLikeToResource,
    getAllDetailsOfResource,
    searchResources,
    getMyResources,
    addCommentToResource,
    getAllDetailsOfResource,
    getURLById,
    addRatingToResource
  };
}

module.exports = queryGenerator;



