const sequelize = require('../functions/database');

exports.authorize = async (req, res) => {
  const query = await sequelize.query(
    `SELECT access_token FROM sop.users WHERE id = ${req.body.id};`
  );
  const result = await query;
  const token = result[0][0].access_token;

  if (token === req.body.access_token) {
    res.status(200).json(true);
  } else {
    res.redirect(401, `${process.env.CLIENT_URL}/401`);
  }
};
