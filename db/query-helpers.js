const queryGenerator = (db) => {

  const getUserByEmail = async (email) => {
    const value = [email];
    const queryString = `SELECT * FROM users WHERE email = $1;`
    return await db.query(queryString, value);
  };

  const createNewUser = async (userInfo) => {
    const { email, hashedPassword, username, firstName, lastName } = userInfo;
    const values = [email, hashedPassword, username, firstName, lastName];
    const queryString = `
      INSERT INTO users (email, password, username, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `;

    return await db.query(queryString, values);
  }




  return { getUserByEmail, createNewUser };
}

module.exports = queryGenerator;



