const nodemailer = require('nodemailer');
const env = require('dotenv').config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: 'siddh4194@gmail.com',
    pass: process.env.KEYWORD,
  },
});
const mailSender = (email,hash)=>{
  console.log("----------------------at mailSender--------------------");
  const mailOptions = {
    from: 'siddh4194@gmail.com',
    to: email,
    subject: 'Email Verification Aptous4',
    html: `
      <div style="border: 1px solid #678983; padding: 20px; border-radius: 10px;">
        <h1 style="text-align:center">Aptous4 Security 🔐</h1>
        <h2>Thank You For Your Efforts</h2>
        <h3>Our main goal is to provide better guidance to students.</h3>
        <p>This is your OTP to verify the mail </p>
        <div style="display:flex; flex-direction:row;"><div style="border: 1px solid #678983; padding: 20px; border-radius: 10px 10px 10px 10px;"><strong id="hashKey">${hash}</strong></div></div>
      </div>
    `,
  };
  
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log('Email sent successfully!', info.messageId);
    }
  });  
}

module.exports = mailSender;