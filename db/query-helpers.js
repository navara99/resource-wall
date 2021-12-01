const defaultProfilePicUrl = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

const getFirstRecord = (result) => result.rows[0];

const assignProfilePic = (userInfo) => {
  const { image_url } = userInfo;
  if (!image_url) userInfo.image_url = defaultProfilePicUrl;
};

const assignMyProfilePic = (details) => {
  const { my_profile_url } = details;
  if (!my_profile_url) details.my_profile_url = defaultProfilePicUrl;
};

const queryGenerator = (db) => {

  const getUserByValue = async (columnName, value) => {
    const values = [value];
    const queryString = `SELECT * FROM users WHERE ${columnName} = $1;`;
    const result = await db.query(queryString, values);
    const userInfo = getFirstRecord(result);
    if (userInfo) assignProfilePic(userInfo);
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
    assignProfilePic(newUserInfo);
    return newUserInfo;
  }

  const updateUser = async (newUserInfo) => {
    const { firstName, lastName, username, email, bio, userId } = newUserInfo;
    const values = [firstName, lastName, username, email, bio, userId];

    const queryString = `
    UPDATE users
    SET first_name = $1,
    last_name = $2,
    username = $3,
    email = $4,
    bio = $5
    WHERE id = $6
    RETURNING *;
    `;

    const result = await db.query(queryString, values);
    const userInfo = getFirstRecord(result);
    assignProfilePic(userInfo);
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
    assignProfilePic(userInfo);
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
    const queryString = `INSERT into likes (user_id, resource_id) VALUES ($1, $2) RETURNING *;`;
    const result = await db.query(queryString, values);
    return result.rows;
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
      (SELECT COUNT(id) FROM likes WHERE resource_id = $1) AS likes,
      comment,
      timestamp,
      x.username,
      x.image_url,
      y.first_name,
      y.last_name,
      y.username AS owner_username,
      (SELECT image_url FROM users WHERE id = $2) as my_profile_url,
      (SELECT COUNT(id) FROM likes WHERE user_id = $2 AND resource_id = $1) AS liked
    FROM resources
    LEFT OUTER JOIN comments ON resources.id = comments.resource_id
    LEFT OUTER JOIN users x on comments.user_id = x.id
    LEFT OUTER JOIN users y on resources.user_id = y.id
    JOIN categories ON categories.id = resources.category_id
    WHERE resources.id = $1
    ORDER BY timestamp DESC;`

    const result = (await db.query(queryString, value)).rows;
    result.forEach((details) => assignProfilePic(details));
    assignMyProfilePic(result[0]);
    return result;
  };

  return {
    createNewUser,
    getUserByValue,
    updatePasswordById,
    updateUser,
    addNewResource,
    getIdFromCategory,
    getAllResources,
    addLikeToResource,
    getAllDetailsOfResource
  };
}

module.exports = queryGenerator;



