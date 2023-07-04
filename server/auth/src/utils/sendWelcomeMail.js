const { createTransport } = require("nodemailer");
require("dotenv").config();
const ejs = require('ejs');

const email_config = require('../config/emailConfig');
const transporter = createTransport(email_config);

async function sendWelcomeMail(email) {
  try{
    let htmlContent = await ejs.renderFile('./src/views/welcomeInfo.ejs', {
      sender: 'The Solitaro Team',
      username: 'Benito'
    });
  }
  catch(error){
    console.log(error);
  }

  let message_options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Solitaro - Where Awesomeness Flourishes!",
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(message_options);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendWelcomeMail };