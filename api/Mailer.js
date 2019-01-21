var signature = `\nMet vriendelijke groet, \nBart-Jan`;

module.exports = {
    sendMail: function(mailto, subject, body){
        let nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: 'ceespottest@gmail.com',
             pass: 'theCTest1!'
         }
      });

      let mailOptions = {
          from: 'ceespottest@gmail.com',
          to: mailto,
         subject: subject,
         text: body + signature
      };

      transporter.sendMail(mailOptions, function(error, info){
           if (error) {
             console.log(error);
           } else {
              console.log('Email sent: ' + info.response);
           }
      });
    }
};