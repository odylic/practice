const User = require('../models/userModel');

const cookieController = {};

// setCookie with a random number
cookieController.setCookie = (req, res, next) => {
  res.cookie('secret', Math.floor(Math.random() * 100));
  return next();
};

// setSSID cookie session ID
cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.user.id, {httpOnly: true});

  console.log('SETSSIDCOOKIE FIRED');

  return next();
};

module.exports = cookieController;
