const HTML = require('js-to-html').html;

/**
 * Class representing a TicketMailTemplate.
 * Will allow us to create as many Tickets as we want according to templates in html.
 * This class is using js-to-html to produce the work.
 */
class TicketMailTemplate {
  /**
   * Create a Ticket Mail template.
   */
  constructor() {

  }

  /**
   * Will generate a new HTML ticket to send via mail. 
   * @param {Object} ticket - that will be analyzed to create html content.
   */
  generate(ticket) {
    return "<b> " + ticket + " </b>";
  }
}

module.exports.TicketMailTemplate = TicketMailTemplate;