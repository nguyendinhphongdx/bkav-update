const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const versionRouter = require('../app/controllers/VersionController');
const verifyToken = require("../app/helpers/tokenCheker");
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })
router.post('/add', verifyToken,versionRouter.createVersion);



module.exports = router;