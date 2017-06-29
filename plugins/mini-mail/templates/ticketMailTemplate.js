const moment = require('moment');

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
  generate(ticket, callback) {
    var productItems      = "",
        duplicata         = ticket.ticketType == "duplicate" ? `<h1 class="title" style="text-align:center; color:orange;">- DUPLICATA -</h1>` : ``,
        globalDiscount    = ticket.globalDiscountOnTicket ? ticket.globalDiscountOnTicket : 0.00,
        withoutTaxesPrice = ticket.totalPrice - ticket.totalTVA,
        dateTicket        = moment().format("D/MM/YYYY - HH:mm:ss");

    ticket.bag.forEach((v) => {
      productItems += `<tr style="border-top:1px dotted black;">`
        + `<td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">`+ v.name +`</td>`
        +  `<td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">x`+ v.quantity +`</td>`
        +  `<td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">`+ v.unitPrice +`</td>`
        + ` </tr>`;
    }, this);
    
    // Will pass the value of the html content to the return callback.
    if(callback) callback(`<section style="font-family: monospace; background-color:white; padding: 45px 20px; max-width:450px; display:block; flex-direction:column; width: 490px; height:731px">
    <div class="ticket" style="position: relative; width:100%; height:100%; top:0; margin:0; display:inline-block; flex-direction:column; border:1px solid black; align-items: center;">
        <header>
            ${duplicata}
            <h1 class="title" style="text-align:center;">${ticket.shopInfo.name}</h1>
            <div class="header-info" style="text-align:center; width: 100%; display:inline-block;">
                <span id="address-store">${ticket.shopInfo.address}</span><br>
                <span id="city-store">${ticket.shopInfo.city} ${ticket.shopInfo.country}</span><br>
                <span id="phone-store">Telephone: ${ticket.shopInfo.tel} </span><br>
                <span id="website-store">${ticket.shopInfo.websiteUrl}</span><br>
            </div>
        </header>
        <br>
        <br>
        <div class="body-ticket" style="width:100%;">
            <table style="width:100%;">
                <thead>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>U.P. (€)</th>
                </thead>
                <tbody>
                    ${productItems}
                </tbody>
            </table>
            <hr style="border:2px dotted black;">
            <br>
            <br>
            <div class="content-ticket" style="display:inline-block;">
                <span>REMISE: ${globalDiscount}</span> <br>
                <span>PAYE PAR:</span> <br>
                <span>RENDU:</span> <br>
            </div>
            <br>
            <br>
            <hr style="border:2px dotted black;">
            <table style="width:100%;">
                <thead>
                    <th>NO TAXES (€)</th>
                    <th>VAT (€)</th>
                    <th>TOTAL (€)</th>
                </thead>
                <tbody>
                    <tr style="border-top:1px dotted black;">
                        <td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">${withoutTaxesPrice}</td>
                        <td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:115px;">${ticket.totalTVA}</td>
                        <td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:115px; color:green;">${ticket.totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <br>
            <div class="client-info" style="display:inline-block;">
                <span style="padding-left:4px;"><strong> Client:</strong> ${ticket.clientId}</span> <br>
                <span style="padding-left:4px;"><strong> N° de Ticket:</strong> ${ticket.ticketId}</span> <br>
                <span style="padding-left:4px;"><strong> Date:</strong> ${dateTicket}</span> <br>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <footer class="footer-ticket" style="text-align:center;">
            <span>${ticket.messageOptions.promo}</span>
            <br>
            <span>${ticket.messageOptions.thanks}</span>
            <br>
            <span>${ticket.messageOptions.info}</span>
        </footer>
    </div>
</section>`);
  }
}

module.exports.TicketMailTemplate = TicketMailTemplate;