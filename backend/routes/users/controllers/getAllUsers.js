const { Users } = require("./typedData");

async function getUsersQuery(session) {
  const query = `
    SELECT id, FullName, login, password
    FROM admin_users;
    `;
    const {resultSets} = await session.executeQuery(query);
    return Users.createNativeObjects(resultSets[0])
}

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsersQuery(req.ydbSession)
    res.send(users)
  } catch (err) {
    console.error(err, '/users')
    res.status(400).send('Smth went wrong')
  }
}

module.exports = {
  getAllUsers
}