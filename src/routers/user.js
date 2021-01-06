const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })


module.exports = router;