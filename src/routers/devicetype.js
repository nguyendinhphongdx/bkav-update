const express = require("express");
const router = express.Router();
const deviceRouter = require("../app/controllers/DeviceTypeController");
const verifyToken = require("../app/helpers/tokenCheker");
router.post("/create", verifyToken, deviceRouter.createDeviceType);
router.get("/getAll", verifyToken, deviceRouter.getAllDeviceType);
router.get("/get/:id", verifyToken, deviceRouter.queryWithId);
router.post("/add-version",verifyToken,deviceRouter.addVersion);
module.exports = router;
