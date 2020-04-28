const sequelize = require('../functions/database');
const moment = require('moment');

exports.recordPower = async (req, res) => {
  const {
    id,
    date,
    building,
    research,
    troop,
    trap,
    dragon_talent,
    dragon,
    armory
  } = req.body;
  const update = await sequelize.query(`INSERT INTO sop.power (userid, date, building, research, troop, trap, dragon_talent, dragon, armory)
    VALUES (${id}, ${moment(date).format(
    'x'
  )}, ${building} ,${research}, ${troop}, ${trap}, ${dragon_talent}, ${dragon}, ${armory})`);
  const data = await update;
  if (data[1] === 1) {
    return res.status(200).json({
      message: `Successfully added power for ${moment(date).format(
        'MMMM Do YYYY, h:mm A'
      )}`
    });
  } else {
    return res.status(204).json({
      message: `My Liege, there was a problem with the submission, try again later`
    });
  }
};

exports.getPower = async (req, res) => {
  const query = await sequelize.query(`
  SELECT 
  date as x
  , research
  , troop
  , trap
  , dragon_talent
  , dragon
  , armory
  , building 
  from sop.power
  WHERE userid = ${req.query.id}
  ORDER BY date ASC;`);
  const result = await query;
  return res.status(200).json(result[0]);
};
