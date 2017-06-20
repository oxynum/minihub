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
    MiniMailTicket = require('../../plugins/mini-mail/miniMailTicket').MiniMailTicket;

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
* @method {POST} - ticket sent by the service
*/
router.post('/ticket', (req, res) => {
  let miniMail = new MiniMailTicket();

  miniMail.sendTicket(() => {
      res.sendStatus(404);
  });

});
// [ROUTES FOR MAIL TICKET END]

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
