const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const debug  = require('debug')('server-bif:app');
const serveIndex = require('serve-index')
// const deviceRouter = require("../app/controllers/DeviceController");
const verifyToken = require("../app/helpers/tokenCheker");

// router.post("/create", deviceRouter.addDevice);
// router.get("/getAll", verifyToken, deviceRouter.getAllDeviceType);
// router.get("/get/:id", verifyToken, deviceRouter.queryWithId);
// router.post("/add-version",verifyToken,upload.single('file'),deviceRouter.addVersion);
module.exports = router;
