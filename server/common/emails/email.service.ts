import { register, resetPassword, confirmEmail } from './emailForms';
import { keys } from "../../keys/keys";


//Nodemailer
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: keys.MAIL_HOST.host,
  port: keys.MAIL_HOST.port,
  secure: keys.MAIL_HOST.secure, // true for 465, false for other ports
  auth: {
    user: keys.MAIL_HOST.auth.user, // generated ethereal user
    pass: keys.MAIL_HOST.auth.pass, // generated ethereal password
  },
});


// регистрация аккунта
module.exports.sendEmail_AccountRegistered = async function (emailTo: string, token: string) {
  try {
    // Nodemailer
    // send mail with defined transport object
    let info = await transporter.sendMail(register(emailTo, token));
    return true;

  } catch (e) {
    throw e;
  }
}

// подтверждение пароля
module.exports.sendEmail_ConfirmRegisteredEmail = function () {
  try {

  } catch (e) {
    throw e;
  }
}

// изменение пароля
module.exports.sendEmail_ChangePassword = async function (email: string, token: string) {
  try {
    let info = await transporter.sendMail(resetPassword(email, token));
    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    throw e;
  }
}