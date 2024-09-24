const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendVerificationEmail = (to, verificationToken) => {
  const subject = 'Verify Your Email';
  const text = `Please click on the following link to verify your email: ${process.env.FRONTEND_URL}/verify/${verificationToken}`;
  
  return sendEmail(to, subject, text);
};

module.exports = { sendEmail, sendVerificationEmail };