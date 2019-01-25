'use strict';
let moment = require('moment');
let mailer = require('../Mailer');

exports.sendContactForm = function (req, res) {
  let message = req.body.message + "\n Naam: " + req.body.name + "\n Telefoon: " + req.body.phone;
  mailer.sendMail(req.body.to, 'Contact: ' + req.body.subject, "Bedankt voor uw bericht! \n \n" + message);
  mailer.sendMail('ceespottest@gmail.com', 'Contact: ' + req.body.subject, message);

  res.send({success: true, data: {mailSent: true}});
};