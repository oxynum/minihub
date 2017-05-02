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
  console.log('TestRoutes: \n Time: ', Date.now())
  next();
})

/**
 * [ROUTE] -> /info
 * Will get all infos about a concerned ticket.
 * @method {GET}
 */
router.get('/info', (req, res) => {
  let mini = new MiniPrinterNetwork('Test Printer', '192.168.1.201', 6001);
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
  let mini = new MiniPrinterNetwork('Test Printer', '192.168.1.201', 6001);
  mini.connection = true;
  
  try {
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
    res.code = 401;
    res.send(error);
  }
});

/**
 * [ROUTE] -> /ticket/cd
 * Will print a ticket linked to a escpos system AND also open the CashDraw.
 * @method {POST} - ticket informations send by the service (with "pay in cash" attribute)
 */
router.post('/ticket/cd', (req, res) => {
  let mini = new MiniPrinterNetwork('Test Printer', '192.168.1.201', 6001);
  mini.connection = true;
  
   mini.printTicket(req.body, true);

  res.send({
    test: {
          status: "OK",
          code: 200
    },
    body: req.body
  });
});

/**
 * [ROUTE] -> /cd
 * Will open the cashdraw via escpos system.
 * @method {GET} 
 */
router.get('/cd', (req, res) => {
  let mini = new MiniPrinterNetwork('Test Printer', '192.168.1.201', 6001);
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

module.exports = router;