const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const testRouter = require('../app/controllers/TestController');
const axios = require('axios');
const p = require('phin');

router.post('/netapi',testRouter.testPing);

router.get('/', function(req, res) {
  res.json({
      status: 'API Works',
      message: 'Welcome to USERS API'
  });
});

module.exports = router;