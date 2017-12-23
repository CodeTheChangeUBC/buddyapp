const twilio = require('twilio');

module.exports.sendText = function (req, res) {
  let accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Your Account SID from www.twilio.com/console
  let authToken = 'your_auth_token';   // Your Auth Token from www.twilio.com/console

  let client = new twilio(accountSid, authToken);

  client.messages.create({
    body: req.body.text_msg,
    to: req.body.to,  // Text this number
    from: req.body.from // From a valid Twilio number
  })
    .then((message) => console.log(message.sid));
};
