import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';

/**
 * VerifyEmail class for sending verification emails
 */
export default class VerifyEmail {
  /**
   * Constructor for VerifyEmail class
   */
  constructor(options) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'codingninjas2k16@gmail.com',
        pass:'slwvvlczduktvhdj',
      },
    });
  }

  /**
   * Send a verification email
   */
  async sendmail(email, sub, msg, name, dirName) {
    ejs.renderFile(path.join(path.resolve(), `/src/views/email/${dirName}`), { name, msg }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: 'codingninjas2k16@gmail.com',
          to: email,
          subject: sub,
          html: data,
        };
        try {
          const info = this.transporter.sendMail(mailOptions);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }
}