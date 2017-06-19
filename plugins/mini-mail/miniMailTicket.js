const MiniMail = require('./miniMail').MiniMail;

/**
* Class representing a MiniMail class but is specialized for sending Tickets.
* This class allows to send tickets to customers.
* @extends MiniMail
*/
class MiniMailTicket extends MiniMail {
  /**
  * Create a MiniMailTicket (extends with MiniMail constructor)
  * @param {Object} Transporter - Will indicate which configuration to use for sending a mail. cf MiniMail
  * for details
  */
  constructor(Transporter) {
    super(Transporter);
  }

  /**
  * Will send ticket of a cashier machine by mail.
  * @param {Object} transaction - Transaction to send by mail when confirmed.
  * @param {Array} receivers - receivers of the mail 
  */
  sendTicket() {

  }
}

module.exports.MiniMailTicket = MiniMailTicket;
