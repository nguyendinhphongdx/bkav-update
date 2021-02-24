const express = require("express");
const router = express.Router();
const groupRouter = require("../app/controllers/GroupController");
const verifyToken = require("../app/helpers/tokenCheker");


router.post("/create", verifyToken, groupRouter.createGroup);
// router.get("/getAll", verifyToken, deviceRouter.getAllDeviceType);
// router.get("/get/:id", verifyToken, deviceRouter.queryWithId);
// router.post("/add-version",verifyToken,upload.single('file'),deviceRouter.addVersion);
module.exports = router;
