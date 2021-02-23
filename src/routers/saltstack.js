const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const saltrouter = require('../app/controllers/SaltStackController');
const p = require('phin');
const verifyToken = require("../app/helpers/tokenCheker");

router.post('/netapi',verifyToken,saltrouter.func);
router.post('/netapi/kwarg',saltrouter.fullargs);
router.get('/keys/:device',saltrouter.getKeyNameDevice);
router.get('/minions',saltrouter.getMinions);
router.post('/keys/all',saltrouter.funcKeys)
module.exports = router;