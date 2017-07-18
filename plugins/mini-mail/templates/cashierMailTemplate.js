const moment = require('moment');

/**
 * Class representing a CashierMailTemplate.
 * Will allow us to create as many Cashiers as we want according to templates in html.
 */
class CashierMailTemplate {
  /**
   * Create a Cashier Mail template.
   */
  constructor() {

  }

  /**
   * Will generate a new HTML ticket to send via mail. 
   * @param {Object} cashier - that will be analyzed to create html content.
   */
  generate(cashier, callback) {
    
    // Will pass the value of the html content to the return callback.
    if(callback) callback(`<section style="font-family: monospace; background-color:white; padding: 45px 20px; max-width:450px; display:block; flex-direction:column; width: 490px; height:1260px;">
    <div class="ticket" style="position: relative; width:100%; height:100%; top:0; margin:0; display:inline-block; flex-direction:column; border:1px solid black; align-items: center;">
        <header>
            <h1 class="title" style="text-align:center;">Z-CASHIER</h1>
            <h3 class="title" style="text-align:center;">${cashier.shopInfo.name}</h3>
            <div class="header-info" style="text-align:center; width: 100%; display:inline-block;">
                <span id="address-store">${cashier.shopInfo.address}</span><br>
                <span id="city-store">${cashier.shopInfo.city} ${cashier.shopInfo.country}</span><br>
                <span id="phone-store">Telephone: ${cashier.shopInfo.tel} </span><br>
                <span id="website-store">${cashier.shopInfo.websiteUrl}</span><br>
                <br>
                <br>
                <h3 style="color:green;">Opened: ${cashier.createdAt}</h3>
                <h3 style="color:brown;">Closed: ${cashier.closedAt}</h3>
            </div>
        </header>
        <br>
        <br>
        <hr>
        <table style="position:relative; width: 98%;">
            <thead>
                <tr>
                    <th style="font-weight:bold;">TOTAL VAT: </th>
                    <th style="font-weight:bold;">TOTAL (EUR): </th>
                    <th style="font-weight:bold;">Products Quty: </th>
                </tr>
            </thead>
            <tbody style="text-align: center;">
                <tr>
                    <td>
                        ${cashier.totalVAT}
                    </td>
                    <td>
                        ${cashier.totalAmount}
                    </td>
                    <td>
                        ${cashier.numberOfSaleProducts}
                    </td>
                </tr>
            </tbody>
        </table>
        <hr>
        <div style="text-align: center;">
            <h3>Balance (EUR): ${cashier.differences}</h3>
            <h3>Cash closure: ${cashier.cashAtClosure}</h3>
        </div>
        <hr>
        <div style="postion:relative; width:100%;height:auto; text-align: center;">
            <h1 style="font-size: 30px;">CASH</h1>
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th>
                            Transactions N.
                        </th>
                        <th>
                            Total (EUR)
                        </th>
                    </tr>
                </thead>
                <tbody style="text-align: center;">
                    <tr>
                        <td>
                            ${cashier.totalPaidBy.cash.totalTransaction}
                        </td>
                        <td>
                            ${cashier.totalPaidBy.cash.amount}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border: 1px dotted black;">
        </div>
        <div style="postion:relative; width:100%;height:auto; text-align: center;">
            <h1 style="font-size: 30px;">CARD</h1>
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th>
                            Transactions N.
                        </th>
                        <th>
                            Total (EUR)
                        </th>
                    </tr>
                </thead>
                <tbody style="text-align: center;">
                    <tr>
                        <td>
                            ${cashier.totalPaidBy.card.totalTransaction}
                        </td>
                        <td>
                            ${cashier.totalPaidBy.card.amount}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border: 1px dotted black;">
        </div>
        <div style="postion:relative; width:100%;height:auto; text-align: center;">
            <h1 style="font-size: 30px;">CHECK</h1>
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th>
                            Transactions N.
                        </th>
                        <th>
                            Total (EUR)
                        </th>
                    </tr>
                </thead>
                <tbody style="text-align: center;">
                    <tr>
                        <td>
                            ${cashier.totalPaidBy.check.totalTransaction}
                        </td>
                        <td>
                            ${cashier.totalPaidBy.check.amount}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border: 1px dotted black;">
        </div>
        <div style="postion:relative; width:100%;height:auto; text-align: center;">
            <h1 style="font-size: 30px;">GIFT CARD</h1>
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th>
                            Transactions N.
                        </th>
                        <th>
                            Total (EUR)
                        </th>
                    </tr>
                </thead>
                <tbody style="text-align: center;">
                    <tr>
                        <td>
                            ${cashier.totalPaidBy.giftCard.totalTransaction}
                        </td>
                        <td>
                            ${cashier.totalPaidBy.giftCard.amount}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border: 1px dotted black;">
        </div>
        <div style="postion:relative; width:100%;height:auto; text-align: center;">
            <h1 style="font-size: 30px;">PAYPAL</h1>
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th>
                            Transactions N.
                        </th>
                        <th>
                            Total (EUR)
                        </th>
                    </tr>
                </thead>
                <tbody style="text-align: center;">
                    <tr>
                        <td>
                            ${cashier.totalPaidBy.payPal.totalTransaction}
                        </td>
                        <td>
                            ${cashier.totalPaidBy.payPal.amount}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border: 1px dotted black;">
        </div>
        <div style="postion:relative; width:100%;height:auto; text-align: center;">
            <h1 style="font-size: 30px;">AMEX CARD</h1>
            <table style="width:100%;">
                <thead>
                    <tr>
                        <th>
                            Transactions N.
                        </th>
                        <th>
                            Total (EUR)
                        </th>
                    </tr>
                </thead>
                <tbody style="text-align: center;">
                    <tr>
                        <td>
                            ${cashier.totalPaidBy.amexCard.totalTransaction}
                        </td>
                        <td>
                            ${cashier.totalPaidBy.amexCard.amount}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style="border: 1px dotted black;">
        </div>
    </div>
</section>`);
  }
}

module.exports.CashierMailTemplate = CashierMailTemplate;