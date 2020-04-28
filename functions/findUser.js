const sequelize = require('./database');

const findUser = async id => {
  if (id != null) {
    const query = await sequelize.query(
      `SELECT users.id from users WHERE users.id = ${id}`,
      {
        type: sequelize.QueryTypes.SELECT,
        plain: false
      }
    );
    const result = await query;
    if (result[0] === undefined) {
      return false;
    }

    const returnedId = result[0].id;
    if (returnedId === id) {
      return true;
    }
  }
};

module.exports = findUser;
