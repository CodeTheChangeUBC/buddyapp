const client = require('./../server.js');

// utility function to generate a new jwt with payload user
module.exports.generateJWT = function (userId) {
  return client.jwt.sign({
    user_id: userId
  }, secretKey, { expiresIn: '7d' });

}
