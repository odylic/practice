const Session = require('../models/sessionModel');
const app = require('../server');
const User = require('../models/userModel');
const {response} = require('express');
const sessionController = {};

// needed help to see how if user is already logged in with cookie session
// verify whether or not the session is still valid
sessionController.isLoggedIn = (req, res, next) => {
  // documents in the sessions collection will expire due to the schema expire setting
  console.log('SESSIONCONTROLLER.ISLOGGEDIN FIRED');
  // find in sessions the cookies.SSID
  Session.findOne({cookieId: req.cookies.ssid}, (err, session) => {
    // database error
    if (err)
      return next(
        `Error in sessionController.isLoggedIn: ${JSON.stringify(err)}`
      );
    // no session found
    if (!session) console.log('NO SESSION FOUND');
    // session found
    return next();
  });
};

sessionController.startSession = (req, res, next) => {
  console.log('SESSIONCONTROLLER.STARTSESSION FIRED');

  Session.create({cookieId: res.locals.user.id}, (err, session) => {
    if (err)
      return next(
        `Error in sessionController.startSession: ${JSON.stringify(err)}`
      );
  });
  return next();
};

module.exports = sessionController;
``