const escpos    = require('escpos'),
    MiniPrinter = require('./miniPrinter').MiniPrinter;

/**
 * Class representing a MiniPrinter.
 * (Abstract) This class allow us to print a message on escpos machines.
 * See child Classes: miniPrinterNetwork/miniPrinterUsb/miniPrinterSerial
 * @extends MiniPrinter
 */
class MiniPrinterNetwork extends MiniPrinter {
    /**
     * Create a MiniPrinterNetwork (extends with MiniPrinter constructor)
     * @param {String} Name - name of the printer
     * @param {String} Address - Address that corresponds to the IP address of the connected printer
     * @param {Number} Port - Port that corresponds to the port linked to the ip.
     */
    constructor(Name, Address, Port) {
        super(Name);
        this.device = new escpos.Network(Address, Port);
        this.printer = new escpos.Printer(this.device);
    } 
}

module.exports.MiniPrinterNetwork = MiniPrinterNetwork;