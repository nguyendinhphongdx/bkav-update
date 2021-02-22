const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");
const saltrouter = require('../app/controllers/SaltStackController');
const p = require('phin');

router.post('/netapi',saltrouter.func);
router.post('/netapi/kwarg',saltrouter.fullargs);
router.get('/key/:device',saltrouter.getKeyNameDevice);
router.get('/minions',saltrouter.getMinions);
module.exports = router;