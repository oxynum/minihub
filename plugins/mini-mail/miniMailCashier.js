const MiniMail           = require('./miniMail').MiniMail,
      CashierMailTemplate = require('./templates/cashierMailTemplate').CashierMailTemplate;

/**
* Class representing a MiniMail class but is specialized for sending Cashiers.
* This class allows to send cashiers to the client via the MAILJET API.
* @extends MiniMail
*/
class MiniMailCashier extends MiniMail {
  /**
  * Create a MiniMailCashier (extends with MiniMail constructor)
  * @param {Object} cred - Credentials to send (will be treated by the super class)
  */
  constructor(cred) {
    super(cred);
  }

  /**
  * Will send cashier report by mail.
  * @param {Object} cashier - Cashier to send by mail when confirmed.
  * @param {Array} receiver - receivers of the mail.
  * @param {Function} callback - Function to be called at the end with the emailData returned.
  */
  prepareTicketMail(cashier, receiver, callback) {
    let cashierMail = new CashierMailTemplate();

    cashierMail.generate(cashier, (htmlContent) => {
      var emailData = {
        'FromEmail': 'maxime@oxynum.fr',
        'FromName': 'Minimag Cashier Report Service',
        'Subject': 'Your cashier report for: ' + receiver,
        'Html-part': htmlContent,
        'Recipients': [{'Email': receiver}],
      };
    callback(emailData);
    });
  }
}

module.exports.MiniMailCashier = MiniMailCashier;
