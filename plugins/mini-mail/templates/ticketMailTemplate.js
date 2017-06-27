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
    let productItems = "";

    ticket.bag.forEach((v) => {
      this.productsItems += `<tr style="border-top:1px dotted black;">`
        + `<td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">`+ v.name +`</td>`
        +  `<td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">x`+ v.quantity +`</td>`
        +  `<td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">`+ v.unitPrice +`</td>`
        + ` </tr>`;
    }, this);

    return `<section style="font-family: monospace; background-color:white; padding: 45px 20px; max-width:450px; display:block; flex-direction:column; width: 490px; height:731px">
    <div class="ticket" style="position: relative; width:100%; height:100%; top:0; margin:0; display:inline-block; flex-direction:column; border:1px solid black; align-items: center;">
        <header>
            <h1 class="title" style="text-align:center;">Minimag Store</h1>
            <div class="header-info" style="text-align:center; width: 100%; display:inline-block;">
                <span id="address-store">33 avenue bertrand lagarre</span><br>
                <span id="city-store">75012 Paris</span><br>
                <span id="phone-store">Telephone: 04 34 23 21 12</span><br>
                <span id="website-store">www.minimag.shop</span><br>
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
                    `+ productItems +`
                </tbody>
            </table>
            <hr style="border:2px dotted black;">
            <br>
            <br>
            <div class="content-ticket" style="display:inline-block;">
                <span>REMISE:</span> <br>
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
                        <td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:204px;">240,00</td>
                        <td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:115px;">60,00</td>
                        <td style="text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:115px; color:green;">300,00</td>
                    </tr>
                </tbody>
            </table>
            <br>
            <br>
            <br>
            <div class="client-info" style="display:inline-block;">
                <span style="padding-left:4px;"><strong> Client:</strong> #132914548454</span> <br>
                <span style="padding-left:4px;"><strong> N° de Ticket:</strong> 09080808090809</span> <br>
                <span style="padding-left:4px;"><strong> Date:</strong> 12/07/2019 - 13:04:23</span> <br>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <footer class="footer-ticket" style="text-align:center;">
            <span>Dès -50% sur les chaussures en magasin du 17 au 29 Décembre 2019</span>
            <br>
            <span>Merci de votre visite et à bientôt chez Minimag Store</span>
            <br>
            <span>Veuillez conserver ce ticket afin de bénéficier de code de réduction</span>
        </footer>
    </div>
</section>`;
  }
}

module.exports.TicketMailTemplate = TicketMailTemplate;