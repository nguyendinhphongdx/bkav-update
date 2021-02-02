const express = require('express');
const router = express.Router();
const authenRouter = require('../app/controllers/AuthenController');
// const { validate } = require('../app/validate/UserValidate');
const path = require('path');
const multer = require("multer");

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


router.post('/login', authenRouter.login);
router.post('/logout/:id', authenRouter.logout);


module.exports = router;
