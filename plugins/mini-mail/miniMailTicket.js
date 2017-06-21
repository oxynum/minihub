const MiniMail           = require('./miniMail').MiniMail,
      TicketMailTemplate = require('./templates/ticketMailTemplate').TicketMailTemplate;

/**
* Class representing a MiniMail class but is specialized for sending Tickets.
* This class allows to send tickets to customers via the MAILJET API.
* @extends MiniMail
*/
class MiniMailTicket extends MiniMail {
  /**
  * Create a MiniMailTicket (extends with MiniMail constructor)
  * @param {Object} cred - Credentials to send (will be treated by the super class)
  */
  constructor(cred) {
    super(cred);
  }

  /**
  * Will send ticket of a cashier machine by mail.
  * @param {Object} ticket - Transaction to send by mail when confirmed.
  * @param {Array} receiver - receivers of the mail.
  * @param {Function} callback - Function to be called at the end with the emailData returned.
  */
  prepareTicketMail(ticket, receiver, callback) {
    var emailData = {
      'FromEmail': 'maxime@oxynum.fr',
      'FromName': 'Mol',
      'Subject': 'Your transaction Ticket from: ',
      'Html-part': new TicketMailTemplate().generate(ticket),
      'Recipients': [{'Email': receiver}],
    };
    callback(emailData);
  }
}

module.exports.MiniMailTicket = MiniMailTicket;
