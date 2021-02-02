const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const userRouter = require('../app/controllers/UserController');
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })
router.post('/add', userRouter.create);
router.get('/', function(req, res) {
  res.json({
      status: 'API Works',
      message: 'Welcome to FirstRest API'
  });
});

module.exports = router;