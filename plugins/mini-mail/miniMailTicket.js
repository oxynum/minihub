const MiniMail = require('./miniMail').MiniMail;

/**
* Class representing a MiniMail class but is specialized for sending Tickets.
* This class allows to send tickets to customers via the MAILJET API.
* @extends MiniMail
*/
class MiniMailTicket extends MiniMail {
  /**
  * Create a MiniMailTicket (extends with MiniMail constructor)
  */
  constructor(cred) {
    super(cred);
  }

  /**
  * Will send ticket of a cashier machine by mail.
  * @param {Object} transaction - Transaction to send by mail when confirmed.
  * @param {Array} receivers - receivers of the mail.
  * @param {Function} callback - Function to be called at the end.
  */
  sendTicket(transaction, callback) {

  }
}

module.exports.MiniMailTicket = MiniMailTicket;
