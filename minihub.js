const MiniPrinterUsb     = require('./mini-printer/miniPrinterUsb').MiniPrinterUsb,
      MiniPrinterNetwork = require('./mini-printer/miniPrinterNetwork').MiniPrinterNetwork,
      MiniPrinterSerial  = require('./mini-printer/miniPrinterSerial').MiniPrinterSerial,
      express            = require('express'),
      bodyParser         = require('body-parser');

let app        = express(),
    testRoutes = require('./routes/testTicketsRoutes'),
    api        = require('./routes/ticketsRoutes');

// [CONFIG]
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse response to JSON.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Allow Cross Origin access

// [USED ROUTES]
app.use('/mm/tests', testRoutes);
app.use('/printer/mm/api', api);

// [LISTENING PORT]
app.listen(7001, () => {
  console.log('Printer System is connected on port: ' + 3001);
});