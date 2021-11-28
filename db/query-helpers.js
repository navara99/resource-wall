const defaultProfilePicUrl = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

const getFirstRecord = (result) => result.rows[0];

const assignProfilePic = (userInfo) => {
  const { image_url } = userInfo;
  if (!image_url) userInfo.image_url = defaultProfilePicUrl;
}

const queryGenerator = (db) => {

  // const getUserByEmail = async (email) => {
  //   const value = [email];
  //   const queryString = `SELECT * FROM users WHERE email = $1;`
  //   return await db.query(queryString, value);
  // };

  // const getUserByValue2 = async (columnName, value) => {
  //   const values = [value];
  //   const queryString = `SELECT * FROM users WHERE ${columnName} = $1;`;
  //   const result = await db.query(queryString, values);
  //   const userInfo = getFirstRecord(result);
  //   assignProfilePic(userInfo);
  //   return userInfo;
  // };


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

  return { createNewUser, getUserByValue, updatePasswordById, updateUser };
}

module.exports = queryGenerator;



