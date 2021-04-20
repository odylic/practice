const express = require('express');
const {restart} = require('nodemon');
const router = express.Router();
const mainController = require('../controller/mainController');

router.get('/', mainController.get, (req, res) => {
  res.status(200).json({});
});

module.exports = router;
