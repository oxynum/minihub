const MiniPrinter = require('./miniPrinter').MiniPrinter;

class MiniPrinterUsb extends MiniPrinter {
    constructor(Name) {
        super(Name);
        this.device  = new escpos.USB();
        this.printer = new escpos.Printer(this.device);
    }
}

module.exports.MiniPrinterUsb = MiniPrinterUsb;