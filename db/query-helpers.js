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

  const getUserByValue2 = async (columnName, value) => {
    const values = [value];
    const queryString = `SELECT * FROM users WHERE ${columnName} = $1;`;
    const result = await db.query(queryString, values);
    const userInfo = getFirstRecord(result);
    assignProfilePic(userInfo);
    return userInfo;
  };


  const getUserByValue = async (columnName, value) => {
    const values = [value];
    const queryString = `SELECT * FROM users WHERE ${columnName} = $1;`;
    // const result = ;
    // if (!result[0].image_url) result[0].image_url = defaultProfilePicUrl;
    return await db.query(queryString, values);
  };

  const createNewUser = async (userInfo) => {
    const { email, password, username, firstName, lastName } = userInfo;
    const values = [email, password, username, firstName, lastName];
    const queryString = `
      INSERT INTO users (email, password, username, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `;

    return await db.query(queryString, values);
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

  return { createNewUser, getUserByValue, updatePasswordById, getUserByValue2 };
}

module.exports = queryGenerator;



