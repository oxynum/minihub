/**
 * Modules minihub
 * 
 * This module is due to link all APIs request for Minimag Software.
 * To add a plugin via the API system, you must create:
 * - Folder inside plugins: plugins/your-plugin
 * - Folder inside routes: routes/your-plugin
 * 
 * Once you have created the architecture of your project,
 *  inside you must create all you need to make your api works. Models/Class...
 * Next you have to define your routes that will use those models.
 * 
 * Inside the minihub.js file, you must add The route depedency -> [REQUIRED ROUTES] mark.
 * And you must provide to express, to use it -> app.use('/mm/plugins/yourplugin', yourplugin)
 * 
 * After that you can also test your plugins inside the test folder:
 * Tests: tests/plugins or tests/routes
 * Be sur that all you code pass tests.
 * 
 * ------------------
 * # WARNING, we want all test done and validate otherwise we do not want to publish new version of this module.
 * ------------------
 *
 * @module ./minihub or minihub
 */
const express            = require('express'),
      bodyParser         = require('body-parser');


// [REQUIRED ROUTES]
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
app.use('/mm/plugins/printer', miniPrinter);

// [LISTENING PORT]
module.exports = app; 