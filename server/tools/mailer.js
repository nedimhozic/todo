var nodemailer = require('nodemailer');
var config = require('../config');

//Send email
exports.sendEmail = function (email, token) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email,
                pass: config.password
            }
        });

        const mailOptions = {
            from: config.email,
            to: email,
            subject: 'ToDo validation',
            html: 'http://localhost:5000/#!/login?token=' + token
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}