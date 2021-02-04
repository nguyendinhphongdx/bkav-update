const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRouter = require("../app/controllers/UserController");
const verifyToken = require("../app/helpers/tokenCheker");
router.post("/add", userRouter.create);
router.get("/", function (req, res) {
  res.json({
    status: "API Works",
    message: "Welcome to USERS API",
  });
});
router.get("/queryAll", verifyToken, userRouter.queryAll);

router.get("/api/test", (req, res) => {
  res.send({ hello: "world" });
});

module.exports = router;
