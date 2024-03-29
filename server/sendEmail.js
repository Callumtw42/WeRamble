const nodemailer = require('nodemailer');
module.exports = {
    sendEmail: (email) => {
        const log = console.log;
        //const account = require("./Registration");
        //const email = account.email;


        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let index = 0; index < 25; index++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }


        // Step 1
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'weramble2021@gmail.com', // TODO: your gmail account
                pass: '0089fxcy?' // TODO: your gmail password
            }
        });

        // Step 2
        let mailOptions = {
            from: 'weramble2021@gmail.com', // TODO: email sender
            to: email, // TODO: email receiver
            subject: 'WeRamble Account',
            text: 'Account Confirmation!!',
            html: `<h1>Email Confirmation</h1>
          <h2>Hello new User</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <p>Once you have clicked the link please reopen the app and log in</p>
          <a href=http://localhost:8081/confirm/${token}> Click here</a>
          </div>`

        };
        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log('Error occurs', err);
            }
            return log('Email sent!!!');
        });

    }
}
