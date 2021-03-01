const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const saltrouter = require('../app/controllers/SaltStackController');
const p = require('phin');
const verifyToken = require("../app/helpers/tokenCheker");
// const { exec } = require('child_process');
var Client = require('ssh2').Client;

var exec = require('child_process').exec;
var conn = new Client();
router.post('/netapi',verifyToken,saltrouter.func);
router.post('/netapi/kwarg',saltrouter.fullargs);
router.get('/keys/:device',saltrouter.getKeyNameDevice);
router.get('/minions',saltrouter.getMinions);
router.post('/keys/all',saltrouter.funcKeys)
router.get('/ssh',function(req, res){
    var conn = new Client();
    conn.on('ready', function() {
      console.log('Client :: ready');
      conn.exec('ls', function(err, stream) {
        if (err) throw err;
        stream.on('open', function(code, signal) {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', function(data) {
            runCommands( ["rsync --chmod=u+rwx,g+rwx,o+rwx /home/master server:/home"], function(err, results) {
                console.log("results "+results);
            });
        

          console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
          console.log('STDERR: ' + data);
        });
      });
    }).connect({
        host: '10.2.65.34',
        port: 22,
        username: 'master',
        password: '123456a@A!@#$'
      });
    
})
function runCommands(array, callback) {

    var index = 0;
    var results = [];

    function next() {
       if (index < array.length) {
           exec(array[index++], function(err, stdout) {
               if (err) return callback(err);
               // do the next iteration
               results.push(stdout);
               next();
           });
       } else {
           // all done here
           callback(null, results);
       }
    }
    // start the first iteration
    next();
    console.log(next());
}

router.get('/sftp',function(req, res){
    // const { spawn } = require("child_process");

    // const ls = spawn("ls", ["-la"]);
    
    // ls.stdout.on("data", data => {
    //     console.log(`stdout: ${data}`);
    // });
    
    // ls.stderr.on("data", data => {
    //     console.log(`stderr: ${data}`);
    // });
    
    // ls.on('error', (error) => {
    //     console.log(`error: ${error.message}`);
    // });
    
    // ls.on("close", code => {
    //     console.log(`child process exited with code ${code}`);
    // });
    runCommands( ["rsync --chmod=u+rwx,g+rwx,o+rwx /path/to/file server:/path/to/file"], function(err, results) {
        console.log(results);
    });
})


module.exports = router;