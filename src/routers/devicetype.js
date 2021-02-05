const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const debug  = require('debug')('server-bif:app');
const serveIndex = require('serve-index')
const deviceRouter = require("../app/controllers/DeviceTypeController");
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
router.post("/create", verifyToken, deviceRouter.createDeviceType);
router.get("/getAll", verifyToken, deviceRouter.getAllDeviceType);
router.get("/get/:id", verifyToken, deviceRouter.queryWithId);
router.post("/add-version",verifyToken,upload.single('file'),deviceRouter.addVersion);
module.exports = router;
