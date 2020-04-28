// Middleware
const axios = require('axios');
const btoa = require('btoa');
const sequelize = require('../functions/database');
// Functions
const saveUserToDB = require('../functions/saveUserToDB');

// Consts N' Shit
const redirect = encodeURIComponent(
  `${process.env.BACKEND_URL}/api/discord/callback`
);

// Controllers
exports.login = (req, res) => {
  res.redirect(
    `https://discordapp.com/api/oauth2/authorize?client_id=690711589627625492&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=email%20identify%20guilds`
    // `https://discordapp.com/api/oauth2/authorize?client_id=690711589627625492&redirect_uri=https%3A%2F%2Fapi.ironfealty.com%2Fv1%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email%20guilds`
  );
};

exports.getUserInfo = async (req, res) => {
  console.log(req.query.code);
  if (!req.query.code) {
    throw new Error('No Code Provided');
  }
  id = req.query.code;
  const findInfo = await sequelize.query(
    `SELECT * FROM sop.users WHERE users.id = ${id}`
  );
  const infoFound = await findInfo;
  console.log(infoFound[0]);
  return res.status(200).json({ data: infoFound[0] });
};

exports.callback = async (req, res) => {
  if (!req.query.code) throw new Error('No Code Provided');
  const code = req.query.code;
  const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);

  try {
    const request = await axios({
      method: 'POST',
      url: `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
    const serverResponse = await request;
    const json = serverResponse.data;

    // Get the tokens
    const access_token = json.access_token;
    const refresh_token = json.refresh_token;

    // Make another request lol
    const getMe = await axios({
      method: 'POST',
      url: `http://discordapp.com/api/users/@me`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = await getMe;

    saveUserToDB(userInfo.data, access_token, refresh_token);
    console.log(`DATA.ID = ${userInfo.data.id}`);
    if (userInfo.data) {
      const id = btoa(userInfo.data.id);
      const encrypted = id
        .replace('M', '+')
        .replace('Q', '_')
        .replace('x', '-');
      res.redirect(`${process.env.CLIENT_URL}#${encrypted}`);
    }
  } catch {
    (err) => {
      throw new Error(err);
    };
  }
};
