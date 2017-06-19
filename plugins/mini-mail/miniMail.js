const nodemailer = require('nodemailer');

/**
 * Class representing a MiniMail.
 * This class allows us to send preformatted mails:
 * Print Ticket, Sending reports about app, sending cashier closure...
 * Every public method is designed to be used as: sending a specific mail to someone.
 */
class MiniMail {
  /**
   * Create a MiniPrinter
   * @param {String} Transporter represent the transporter of the mail, will initiate a new transporter for nodemailer dep.
   */
  constructor(Transporter) {
    this.transporter = nodemailer.createTransport({
      host: Transporter.host | 'smtp.gmail.com', // Default smtp
      port: Transporter.port | 465,
      secure: Transporter.secure | true,
      auth: {
        user: Transporter.user,
        pass: Transporter.pass
      }
    });
  }

  /**
  * Will send the mail with content passed in params.
  * @param {Object} mailOptions - represents the mail and its content to be sent.
  * @throws MiniMailException if an error occured with sending the mail.
  */
  sendMail(mailOptions, callback) {
    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw new MiniMailException();
      console.log('Message sent to: ', mailOptions.to);
      if(callback) callback(info);
    });
  }
}

module.exports.MiniMail = MiniMail;
