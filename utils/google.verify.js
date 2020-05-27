const CLIENT_ID = '214206807961-mg9102p9h7l534sp78abfeft1gm4tpo0.apps.googleusercontent.com' /*move to env in prod */
const { OAuth2Client } = require('google-auth-library');

module.exports = async req => {
  const { idToken } = req.body
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if ((payload.aud === CLIENT_ID) && (payload.iss === 'accounts.google.com' || 'https://accounts.google.com'))
    return payload
  return null
}