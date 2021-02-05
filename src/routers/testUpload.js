const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const debug  = require('debug')('server-bif:app');
const serveIndex = require('serve-index')
// const uploadRouter = require("../app/controllers/U");

const verifyToken = require("../app/helpers/tokenCheker");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
router.post('/uploadFile', upload.single('file'),verifyToken, function(req,res) {
    debug(req.file);
    console.log('storage location is ', req.hostname +'/' + req.file.path);
    return res.send(req.file);
})
router.use('/ftp', express.static('public'), verifyToken, serveIndex('public', {'icons': true}));


module.exports = router;
