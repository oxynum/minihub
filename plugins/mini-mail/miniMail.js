let nodeMailJet = require('node-mailjet');

/**
 * Class representing a MiniMail.
 * This class allows us to send preformatted mails:
 * Print Ticket, Sending reports about app, sending cashier closure...
 * Every public method is designed to be used as: sending a specific mail to someone.
 * We use the MailJet API to make this module work.
 */
class MiniMail {
  /**
   * Create a MiniMail
   * @param {Object} cred - Credentials to be sent to init the MailJet API
   */
  constructor(cred) {
    this.mailJet = nodeMailJet.connect(cred.apiKey, cred.apiSecret);
  }

  /**
  * Will send the mail with content passed in params.
  * @param {Object} emailData - represents the mail and its content to be sent.
  * @throws MiniMailException if an error occured with sending the mail.
  */
  sendMail(emailData, callback) {
    let sendEmail = mailJet.post('send');

    sendEmail.request(emailData).then((data) => {
      console.log(data);
      callback(data);
    }).catch((err) => {
      throw new Error();
    });
  }
}

module.exports.MiniMail = MiniMail;
