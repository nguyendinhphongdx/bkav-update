const express = require('express');
const router = express.Router();
const authenRouter = require('../app/controllers/AuthenController');
const path = require('path');
const multer = require("multer");
const verifyToken = require('../app/helpers/tokenCheker');

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

router.post('/login', authenRouter.login);
router.post('/logout/:id', authenRouter.logout);
router.get('/secure',verifyToken,authenRouter.secure)
module.exports = router;
