const MiniMail = require('./miniMail').MiniMail;

/**
* Class representing a MiniMail class but is specialized for sending Reports.
* This class allows to send reports to Minimag Team via the MAILJET API.
* @extends MiniMail
*/
class MiniMailReport extends MiniMail {
  /**
  * Create a MiniMailReport (extends with MiniMail constructor)
  */
  constructor(cred) {
    super(cred);
  }

  /**
  * Will send a bug report if the app has crashed and did not close well.
  * Is supposed to trigger the all way of usage, and give it through to allow us
  * detecting the problem.
  * @param {String} clientName - the client name
  * @param {Object} message - the path of usage to detect the bug (principalAction, comments, description)
  * @param {Function} callback - method to be executed at the end of this function.
  */
  sendReportAboutApp(clientName, message, callback) {

  }

  /**
  * Will send an issue report if the client detects something wrong.
  * @param {String} clientName - the client name
  * @param {Object} message - the path of usage to detect the bug (principalAction, comments, description)
  * @param {Function} callback - method to be executed at the end of this function.
  */
  sendAppIssue(clientName, message, callback) {

  }

  /**
  * Will send a request, in order to contact the support: MINIMAG
  * @param {String} message - the message and request sent by the user.
  * @param {Function} callback - method to be executed at the of this method.
  */
  sendClientRequests(message, callback) {

  }
}

module.exports.MiniMailReport = MiniMailReport;
