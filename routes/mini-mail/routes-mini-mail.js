/**
 * Modules api
 *
 * This file is due to execute Routes with all the current mail system implemented.
 *
 * @module ./routes/routes-mini-mail
 */
const express = require('express');
let router         = express.Router(),
    MiniMailReport = require('../../plugins/mini-mail/miniMailReport').MiniMailReport,
    MiniMailTicket = require('../../plugins/mini-mail/miniMailTicket').MiniMailTicket,
    MiniMailCashier = require('../../plugins/mini-mail/miniMailCashier').MiniMailCashier;

/**
 * Allow access to use the route.
 */
router.use(function timeLog(req, res, next) {
  console.log('Connected to mini-mail: \n Time: ', Date.now())
  next();
})

/**
 * [ROUTE] -> /info
 * Will get all infos about connection to the system.
 * @method {GET}
 */
router.get('/info', (req, res) => {
  res.sendStatus(200);
});

// [ROUTES FOR MAIL TICKET START]

/**
* [ROUTE] -> /ticket
* Will send a ticket to print to a user.
* The request must have a body.ticket and a body.receiver.
* @method {POST} - ticket sent by the service
*/
router.post('/ticket', (req, res) => {
  console.log(req.body);
  let miniMail = new MiniMailTicket({apiKey: req.body.confApi.apiKey, apiSecret: req.body.confApi.apiSecret}); // TODO:: MOVE IN ENV VAR RESSOURCES.

  miniMail.prepareTicketMail(req.body.ticket, req.body.receiver, (mail) => {
    miniMail.sendMail(mail, (response) => {
      res.sendStatus(200);
      console.log(response);
    });
  });
});
// [ROUTES FOR MAIL TICKET END]

// [ROUTES FOR CASHIER REPORT START]
router.post('/cashier', (req, res) => {
  console.log(req.body);
  let miniMail = new MiniMailCashier({apiKey: req.body.confApi.apiKey, apiSecret: req.body.confApi.apiSecret}); // TODO:: MOVE IN ENV VAR RESSOURCES.

  miniMail.prepareCashierMail(req.body.cashier, req.body.receiver, (mail) => {
    miniMail.sendMail(mail, (response) => {
      res.sendStatus(200);
      console.log(response);
    });
  });
});
// [ROUTES FOR CASHIER REPORT END]

// [ROUTES FOR MAIL REPORT START]

/**
* [ROUTE] -> /reportToTeam
* Will send a complete report to the dev support about the team.
* @method {POST} - Report established in front sent by the service.
*/
router.post('/reportToTeam', (req, res) => {
  res.sendStatus(200);
});

/**
* [ROUTE] -> /clientRequest
* Will send a client request to the dev team/Team
* @method {POST} - request of the client about a subject
*/
router.post('/clientRequest', (req, res) => {
  res.sendStatus(200);
});

/**
* [ROUTE] -> /appIssue
* Will send an issue linked to the app, if there is a crash.
* @method {POST} - issue sent by the app.
*/
router.post('/appIssue', (req, res) => {
  res.sendStatus(200);
});
// [ROUTES FOR MAIL REPORT END]

module.exports = router;
