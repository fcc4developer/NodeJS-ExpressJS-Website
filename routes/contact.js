var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function (req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function (req, res, next) {
  // Generate SMTP service account from ethereal.email
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'yourmail@mail.com',
        pass: 'yourpassword'
      }
    });

    // Message object
    var message = {
      from: 'Sender Name <sender@example.com>',
      to: 'YourName YourLastname <yourmail@mail.com>',
      subject: 'Website Submission ✔',
      text: `You have a new submission with the following details...
      Name: ${req.body.name} Email: ${req.body.email} Message: ${req.body.message}`,
      html: `<p>You got a new submission with the following details...</p>
            <ul>
              <li>Name: ${req.body.name}</li>
              <li>Email: ${req.body.email}</li>
              <li>Message: ${req.body.message}</li>
            </ul>
          `
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log('Error occurred. ' + err.message);
        res.redirect('/');
      } else {
        console.log('Message sent: %s', info.response);
        res.redirect('/');
      }
    });
  });
});

module.exports = router;