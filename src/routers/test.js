const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const testRouter = require('../app/controllers/TestController');
const axios = require('axios');
const p = require('phin');
var Client = require('ssh2').Client


router.post('/netapi',testRouter.testPing);
router.get('/abc',function(req, res){
  var conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.exec('uptime', function(err, stream) {
    if (err) throw err;
    stream.on('close', function(code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '192.168.100.100',
  port: 22,
  username: 'frylock',
  privateKey: require('fs').readFileSync('/here/is/my/key')
});
})
router.get('/', function(req, res) {
  res.json({
      status: 'API Works',
      message: 'Welcome to USERS API'
  });
});

module.exports = router;