const client = require('./../server.js');

// utility function to generate a new jwt with payload user
modules.export.generateJWT = function (userId) {
  return client.jwt.sign({
    user_id: userId;
  }, secretKey, { expiresIn: '7d' });

}
