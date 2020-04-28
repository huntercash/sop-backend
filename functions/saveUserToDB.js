// Modules
const findUser = require('./findUser');
const sequelize = require('./database');

const saveUserToDB = async (userArray, refresh_token, access_token) => {
  const { id, username, email, discriminator, avatar } = userArray;
  //Find User
  const user = await findUser(id);
  if (user === true) {
    try {
      const update = sequelize.query(
        `UPDATE sop.users SET
        users.access_token = '${access_token}',
        users.refresh_token = '${refresh_token}',
        users.username = '${username}',
        users.avatar = '${avatar}',
        users.discriminator = '${discriminator}',
        users.email = '${email}'
        WHERE users.id = ${id};`
      );
      const result = await update;
      console.log(result);
    } catch {
      err => {
        throw new Error(err);
      };
    }
  }

  if (user === false) {
    try {
      const create = sequelize.query(
        `INSERT INTO sop.users
        (id
          ,access_token
          ,refresh_token
          ,email
          ,username
          ,discriminator
          ,avatar)
          VALUES
          (${id},
           '${access_token}',
           '${refresh_token}',
           '${email}',
           '${username}',
           '${discriminator}',
           '${avatar}');`
      );
      const result = await create;
    } catch {
      err => {
        throw new Error(err);
      };
    }
  }
};

module.exports = saveUserToDB;
