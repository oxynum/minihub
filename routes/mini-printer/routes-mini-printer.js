/**
 * Modules api
 * 
 * This file is due to execute Routes with all the current printer system implemented.
 *
 * @module ./routes/ticketsRoutes
 */
const express = require('express');
let router = express.Router(),
    MiniPrinterNetwork = require('../../plugins/mini-printer/miniPrinterNetwork').MiniPrinterNetwork;


/**
 * Allow access to use the route.
 */
router.use(function timeLog(req, res, next) {
  console.log('Connected to mini-printer: \n Time: ', Date.now())
  next();
})

/**
 * [ROUTE] -> /info
 * Will get all infos about a concerned ticket.
 * @method {GET}
 */
router.get('/info', (req, res) => {
  let mini = new MiniPrinterNetwork(req.get('PRINTER_NAME'), req.get('IP'), req.get('PORT'));
  mini.connection = true;

  res.send({
      test: {
          status: "OK",
          code: 200
      },
      body: mini
  });
});

/**
 * [ROUTE] -> /ticket
 * Will print a ticket linked to a escpos system.
 * @method {POST} - ticket send by the service.
 */
router.post('/ticket', (req, res) => {

  checkPrinterType(req, res, (mini) => {
    try {
      mini.connection = true;
      mini.printTicket(req.body, false);
      res.send({
        test: {
              status: "OK",
              code: 200
        },
        body: req.body
      });
    } catch (error) {
      console.log(error);
      mini.printErr(error);
      res.sendStatus(401);
    }
  });

});

/**
 * [ROUTE] -> /ticket/cd
 * Will print a ticket linked to a escpos system AND also open the CashDraw.
 * @method {POST} - ticket informations send by the service (with "pay in cash" attribute)
 */
router.post('/ticket/cd', (req, res) => {
  checkPrinterType(req, res, (mini) => {
    try {
      mini.connection = true;
      mini.printTicket(req.body, true);
      res.send({
        test: {
              status: "OK",
              code: 200
        },
        body: req.body
      });
    } catch (error) {
      console.log(error);
      mini.printErr(error);
      res.sendStatus(401);
    }
  });
});

/**
 * [ROUTE] -> /cd
 * Will open the cashdraw via escpos system.
 * @method {GET} 
 */
router.get('/cd', (req, res) => {
  let mini = new MiniPrinterNetwork(req.get('PRINTER_NAME'), req.get('IP'), req.get('PORT'));
  mini.connection = true;
  mini.openCashDraw(() => {
      console.warn("CashDraw Openend !");
  });

  res.send({
    test: {
          status: "OK",
          code: 200
    },
    body: req.body
  });
});

/**
 * PRIVATE, will check if Printer is of type: NETWORK/SERIAL/USB
 * @param {request} request the request sent by the body-parser
 * @param {Function} callback to execute after
 */
function checkPrinterType(request, response, callback) {
    switch (request.get('PRINTER_TYPE')) {
    case "NETWORK":
      let mini = new MiniPrinterNetwork(request.get('PRINTER_NAME'), request.get('IP'), request.get('PORT'));
      callback(mini);
    break;

    case "USB":
      response.sendStatus(204);
    break;

    case "SERIAL":
    response.sendStatus(204);
    break;

    default:
      response.status(404);
      response.send('The PRINTER_TYPE header is not well defined: please provide one of those - NETWORK/SERIAL/USB');
      console.log('ERROR DETECTED ===> PRINTER_TYPE');
      return;
      break;
  }
}

module.exports = router;

//TODO:: FINISH TO IMPLEMENT USB AND SERIAL IN CHECKPRINTER.
//TODO:: FINISH TO IMPLEMENT ROUTES.