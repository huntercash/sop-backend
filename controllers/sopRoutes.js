const sequelize = require('../functions/database');
const lodash = require('lodash');

exports.SeatsOfPower = async (req, res) => {
  const query = sequelize.query(
    `SELECT * FROM SOP WHERE SOP.region NOT IN ('The Gift')`
  );
  const response = await query;
  res.status(200).json(response[0]);
};

exports.Titles = async (req, res) => {
  const id = req.query.id;
  if (id) {
    const query = sequelize.query(
      `SELECT title_name, bonus ,number ,title_id FROM BANNER_TITLES WHERE sop_id = ${id};`
    );
    const response = await query;
    const data = response[0];

    const groups = lodash.groupBy(data, function(value) {
      return value.title_id + '#' + value.title_name;
    });

    const finalGroup = lodash.map(groups, function(group) {
      if (group.length > 1) {
        return {
          title_id: group[0].title_id,
          title_name: group[0].title_name,
          bonus: [
            { bonus_name: group[0].bonus, bonus_amount: group[0].number },
            {
              bonus_name: group[1].bonus,
              bonus_amount: group[1].number
            }
          ]
        };
      } else {
        return {
          title_id: group[0].title_id,
          title_name: group[0].title_name,
          bonus: [{ bonus_name: group[0].bonus, bonus_amount: group[0].number }]
        };
      }
    });
    res.status(200).json(finalGroup);
  } else {
    res.status(400).json({ data: 'You did not specify a query parameter' });
  }
};

exports.AttackerTitles = async (req, res) => {
  const id = req.query.id;
  if (id) {
    const query = sequelize.query(
      `SELECT * FROM ATTACKER_TITLES where stars = ${id};`
    );
    const response = await query;
    const data = response[0];
    res.status(200).json(data);
  } else {
    res.status(400).json({ data: 'You did not specify a query parameter' });
  }
};

exports.allBonuses = async (req, res) => {
  const query = sequelize.query(
    `SELECT * FROM sop.all_bonuses
    ORDER BY all_bonuses.stars DESC;`
  );
  const response = await query;
  res.status(200).json(response[0]);
};
