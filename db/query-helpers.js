const defaultProfilePicUrl = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';

const queryGenerator = (db) => {

  // const getUserByEmail = async (email) => {
  //   const value = [email];
  //   const queryString = `SELECT * FROM users WHERE email = $1;`
  //   return await db.query(queryString, value);
  // };

  const getUserByValue = async (columnName, value) => {
    const values = [columnName, value];
    const queryString = `SELECT * FROM users WHERE $1 = $2;`
    const result = await db.query(queryString, values);
    if (!result.image_url) result.image_url = defaultProfilePicUrl;
    return result;
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

  return { createNewUser, getUserByValue };
}

module.exports = queryGenerator;



