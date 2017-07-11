const escpos = require('escpos'),
      _      = require('lodash'),
      moment = require('moment');

/**
 * Class representing a MiniPrinter.
 * (Abstract) This class allow us to print a message on escpos machines.
 * See child Classes: miniPrinterNetwork/miniPrinterUsb/miniPrinterSerial
 */
class MiniPrinter {
  /**
   * Create a MiniPrinter
   * @param {String} Name represent the name of the printer.
   */
  constructor(Name) {
    this.name = Name;
    this.connection = false;
    this.printer = new escpos.Printer();
  }

  /**
   * Will print a ticket.
   * @param {Object} ticket - Ticket object that will be print.
   * @param {Boolean} openCD - boolean that indicates if you need to open cashdraw.
   */
  printTicket(ticket, openCD) {
    if (!this.isTicketValid(ticket)) throw new Error('Bad Request, Ticket is not valid.');

    let currentPrinter = this.printer,
      productsItems = [],
      paidBy = this.getPaymentType(ticket.isPaidBy),
      middlescores = "",
      stars = "";

    ticket.bag.forEach((v) => {
      productsItems += "\n" + _.padEnd(v.name.substr(0, 13), 14)
        + _.pad("x" + v.quantity, 14)
        + _.padStart(v.unitPrice, 14)
        + ((v.productDiscount != 0 && v.productDiscount)
            ? "\n  - REM (EUR): " + v.productDiscount + " - (X" + v.productDiscQuantity + ")\n"
            : "");
    });

    while (middlescores.length < 42) {
      middlescores += "-";
      stars += "*";
    }

    this.device.open(() => {
      // [HEADER]
      currentPrinter
        .font('a')
        .align('ct')
        .style('B')
        .size(2, 2)
        .text(ticket.shopInfo.name + "\n\n\n")
        .size(1, 1)
        .text(ticket.shopInfo.address)
        .text(ticket.shopInfo.postalCode)
        .text(ticket.shopInfo.city + " " + ticket.shopInfo.country)
        .text("Telephone: " + ticket.shopInfo.tel)
        .text("Site web: " + ticket.shopInfo.websiteUrl + "\n\n");

      // [DUPLICATE]
      if(ticket.ticketType == "duplicate") currentPrinter.size(2, 2).text("- DUPLICATA - \n").size(1, 1);

      // [ARRAY FOR PRODUCTS]
      currentPrinter
        .align('lt')
        .text(_.padEnd("Produit", 14) + _.pad("Qte", 14) + _.padStart('Prix U. (EUR)', 14))
        .align('ct')
        .text(middlescores + "\n")
        .align('lt')
        .text(productsItems)
        .align('ct')
        .text(middlescores);

      // [GLOBAL DISCOUNT]
      if(ticket.globalDiscountOnTicket != 0) currentPrinter.align('lt').text('REMISE SUR TOTAL (EUR): ' + ticket.globalDiscountOnTicket + "\n");

      // [PAIDBY]
      currentPrinter
        .text(paidBy);

      // [TOTAL]
      currentPrinter
        .align('lt')
        .text(_.padEnd("H.T. ", 14) + _.pad("TVA.", 14) + _.padStart('TOTAL (EUR)', 14))
        .align('ct')
        .text(middlescores + "\n")
        .text(_.padEnd(ticket.totalPrice - ticket.totalTVA, 14) + _.pad(ticket.totalTVA, 14) + _.padStart(ticket.totalPrice, 14))
        .align('lt')
        .text("\n\nClient: " + ticket.clientId)
        .text("N. Ticket: " + ticket.ticketId)
        .text("Date: " + moment().format("D/MM/YYYY - HH:mm:ss"));

      // [MESSAGES]
      currentPrinter
        .align('ct')
        .text("\n\n")
        .text(stars + "\n")
        .text(ticket.messageOptions.promo + "\n" + ticket.messageOptions.thanks + "\n" + ticket.messageOptions.info);

      // [BARCODE]
      currentPrinter
        .align('ct')
        .barcode(_.padEnd(ticket.ticketId, 13, '0'));

      // [CASHDRAW]
      if (openCD) currentPrinter.cashdraw(2).cashdraw(2);

      // [CLOSE PRINTER]
      currentPrinter.cut().close();
    });
  }

  /**
   * Will print a cashier report with the escpos system.
   * @param {Object} cashier - cashier that is sent by the front: Apparent to a CashierFactory instance (Minimag front)
   */
  printCashier(cashier) {
    let currentPrinter = this.printer,
        middlescores = "",
        stars = "";

    while (middlescores.length < 42) {
      middlescores += "-";
      stars += "*";
    }

    this.device.open(() => {
      // [HEADER OF THE CASHIER TICKET]
      currentPrinter
        .font('a')
        .align('ct')
        .size(3, 3)
        .text("Z-CASHIER \n")
        .size(1, 1)
        .text(cashier.shopInfo.name)
        .text(cashier.shopInfo.address + " " + cashier.shopInfo.city)
        .text(cashier.shopInfo.websiteUrl + "\n")
        .text("Opened: " + cashier.createdAt)
        .text("Closed: " + cashier.closedAt);

      // [TOTAL SUMMARY]
      currentPrinter
        .align('lt')
        .text(middlescores + "\n")
        .style('b')
        .text(_.padEnd("TOTAL VAT:", 14) + _.pad("Total (EUR)", 14) + _.padStart('Products Quty.', 14))
        .align('ct')
        .style('n')
        .text(_.padEnd(cashier.totalVAT, 14) + _.pad(cashier.totalAmount, 14) + _.padStart(cashier.numberOfSaleProducts, 14))
        .text(middlescores + "\n")
        .style('b')
        .text(_.padEnd("Balance (EUR): ", 14) + _.padStart(cashier.differences, 14))
        .text(_.padEnd("Cash closure: ", 14) + _.padStart(cashier.cashAtClosure, 14))
        .text(middlescores + "\n");
      
      // [CASH PART]
      currentPrinter
        .align('ct')
        .size(2, 2)
        .text('CASH')
        .align('lt')
        .size(1, 1)
        .text(_.padEnd("Transactions n.", 21) + _.padStart("Total (EUR)", 21))
        .text(_.padEnd(cashier.totalPaidBy.cash.totalTransaction, 21) + _.padStart(cashier.totalPaidBy.cash.amount, 21))
        .text(stars + "\n");
      
      // [CARD PART]
      currentPrinter
        .align('ct')
        .size(2, 2)
        .text('CARD')
        .align('lt')
        .size(1, 1)
        .text(_.padEnd("Transactions n.", 21) + _.padStart("Total (EUR)", 21))
        .text(_.padEnd(cashier.totalPaidBy.card.totalTransaction, 21) + _.padStart(cashier.totalPaidBy.card.amount, 21))
        .text(stars + "\n");

      // [CHECK PART]
      currentPrinter
        .align('ct')
        .size(2, 2)
        .text('CHECK')
        .align('lt')
        .size(1, 1)
        .text(_.padEnd("Transactions n.", 21) + _.padStart("Total (EUR)", 21))
        .text(_.padEnd(cashier.totalPaidBy.check.totalTransaction, 21) + _.padStart(cashier.totalPaidBy.check.amount, 21))
        .text(stars + "\n");

      // [GIFT CARD PART]
      currentPrinter
        .align('ct')
        .size(2, 2)
        .text('GIFT CARD')
        .align('lt')
        .size(1, 1)
        .text(_.padEnd("Transactions n.", 21) + _.padStart("Total (EUR)", 21))
        .text(_.padEnd(cashier.totalPaidBy.giftCard.totalTransaction, 21) + _.padStart(cashier.totalPaidBy.giftCard.amount, 21))
        .text(stars + "\n");

      // [PAYPAL PART]
      currentPrinter
        .align('ct')
        .size(2, 2)
        .text('PAYPAL')
        .align('lt')
        .size(1, 1)
        .text(_.padEnd("Transactions n.", 21) + _.padStart("Total (EUR)", 21))
        .text(_.padEnd(cashier.totalPaidBy.payPal.totalTransaction, 21) + _.padStart(cashier.totalPaidBy.payPal.amount, 21))
        .text(stars + "\n");

      // [AMEX CARD PART]
      currentPrinter
        .align('ct')
        .size(2, 2)
        .text('AMEX CARD')
        .align('lt')
        .size(1, 1)
        .text(_.padEnd("Transactions n.", 21) + _.padStart("Total (EUR)", 21))
        .text(_.padEnd(cashier.totalPaidBy.amexCard.totalTransaction, 21) + _.padStart(cashier.totalPaidBy.amexCard.amount, 21))
        .text(stars + "\n");

        currentPrinter.cut().close();
    });
  }

  /**
   * Will open the cashdraw
   * @param {Function} callback - method to be called after open cashdraw.
   */
  openCashDraw(callback) {
    let currentPrinter = this.printer;
    this.device.open(() => {
      currentPrinter.cashdraw(2).cashdraw(2).close();
      callback();
    });
  }

  /**
   * Will inform if the current object sent is a valid Object.
   * @param {Object} ticket - Ticket object to control
   * @return {Boolean} - (false: Ticket Not valid) , (true: Ticket is valid)
   */
  isTicketValid(ticket) {
    let types = ["refund" , "pay" , "paygift" , "refundgift" , "duplicate"];

    if (types.indexOf(ticket.ticketType) < 0) return false;
    if (!ticket , !ticket.shopInfo.address , !ticket.ticketId , !ticket.isPaidBy) return false;
    return true;
  }

  /**
   * Will return the payment type linked to the ticket object.
   * @param {Object} paymentTypes - object that contains 4 specific objects as: card, cash, cheque, giftCard.
   */
  getPaymentType(paymentTypes) {
    let method = "";
    if (paymentTypes.card.value) {
      method += "PAYE PAR CARTE: " + Number.parseFloat(paymentTypes.card.amount) + "\n";
    }
    if (paymentTypes.cash.value) {
      method += "PAYE PAR ESPECES: " + paymentTypes.cash.amount + ", RENDU: " + paymentTypes.cash.moneyBack + "\n";
    }
    if (paymentTypes.cheque.value) {
      method += "PAYE PAR CHEQUES: " + paymentTypes.cheque.amount + "\n";
    }
    if (paymentTypes.giftCard.value) {
      method += "PAYE PAR CHEQUES CADEAU: " + paymentTypes.giftCard.amount + "\n";
    }
    return method;
  }

  /**
   * Will print a msg error on the printer. Provide a code to specify the error.
   * Usualy used to when printing data is not available.
   * @param {any} code
   */
  printErr(code) {
    let currentPrinter = this.printer,
      middlescores = "";

    while (middlescores.length < 42) middlescores += "-";
    this.device.open(() => {
      currentPrinter
        .text(middlescores + "\n")
        .text("ERROR TRANSACTION ABANDONED, CODE: " + code)
        .text(middlescores + "\n")
        .cut()
        .close();
    });
  }

  /**
   * Will prepare the launchment of the message.
   * @param {function} callback to be executed at the end of the execution.
   */
  prepareLaunch(callback) {
    console.log("I am preparing the food");
    if (callback) callback();
  }

  /**
   * Will get all informations about the current object. [name] and [isConnected].
   */
  getInformations() {
    if (this.connection) {
      return "Printer: " + this.name + " connected";
    } else {
      return "Printer: " + this.name + " NOT connected";
    }
  }
}

module.exports.MiniPrinter = MiniPrinter;
