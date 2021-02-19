const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRouter = require("../app/controllers/UserController");
const verifyToken = require("../app/helpers/tokenCheker");
const axios = require('axios');
const p = require('phin');

router.post("/add", userRouter.create);
router.get("/queryAll", verifyToken, userRouter.queryAll);

router.get("/api/test", (req, res) => {
  res.send({ hello: "world" });
});
router.post("/api",function (req, res) {
   const data = {
   username:'saltapi',
   password:'saltapi',
   eauth:     'pam'
 }
 axios.post('https://saltgui.bkav.com/api/login',data)
 .then(response => {
  //  console.log(`data response ${response.return[0].token}`);
   console.log("data Res"+ response.data.return[0].expire);
  //  console.log(JSON.stringify(response))
 })
 .catch(err =>{
   console.log(err);
 })
  // res.send("hello world");
})

module.exports = router;
