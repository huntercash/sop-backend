const sequelize = require('sequelize');

const updateUser = async (
  id,
  username,
  email,
  discriminator,
  avatar,
  refresh_token,
  access_token
) => {
  try {
    const update = sequelize.query(`UPDATE sop.users SET
      users.access_token = '${access_token}',
      users.refresh_token = '${refresh_token}',
      users.username = '${username}',
      users.avatar = '${avatar}',
      users.discriminator = '${discriminator}',
      users.email = '${email}'
      WHERE users.id = ${id};`);
    const result = await update;
  } catch {
    err => {
      throw new Error(err);
    };
  }
};

module.exports = updateUser;
