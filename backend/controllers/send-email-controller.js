const nodemailer = require('nodemailer');

module.exports.sendEmail = function(req, res) {
  let transporter = nodemailer.createTransport('smtps://ubc.moonwalk@gmail.com:testubc123@smtp.gmail.com');
  let message = req.body.email_msg;
  let mailOptions = {
    from: 'Moonwalk <ubc.moonwalk@gmail.com>',
    to: 'markrepedersen@gmail.com',
    subject: 'Yo, holla at ya boys from Moonwalk',
    text: message,
    html: '<b>{message}</b>'
  };

  transporter.sendMail(mailOptions, function(error){
    if(error){
      res.json({
        status:false,
        message: 'there was some error with search query'});
    }
    else res.json({
        status: true,
        message: 'email send successfully'
      });
  });
};
