
class TicketMailTemplate {
  
  constructor() {

  }

  generate(ticket) {
    return "<b> " + ticket + " </b>";
  }
}

module.exports.TicketMailTemplate = TicketMailTemplate;