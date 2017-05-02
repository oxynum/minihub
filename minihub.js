const express            = require('express'),
      bodyParser         = require('body-parser');

let app           = express(),
    miniPrinter = require('./routes/mini-printer/routes-mini-printer');

// [CONFIG]
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse response to JSON.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // Allow Cross Origin access

// [USED ROUTES]
app.use('/mm/plugins', miniPrinter);

// [LISTENING PORT]
app.listen(3001, () => {
  console.log('Printer System is connected on port: ' + 3001);
});