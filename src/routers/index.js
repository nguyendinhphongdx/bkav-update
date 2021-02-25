const { version } = require("mongoose");
const userRouter = require("./user");
const authenRouter = require("./authen");
const versionRouter = require("./version");
const testRouter = require("./test");
const deviceTypeRouter = require("./devicetype");
const testUpload = require("./testUpload");
const saltstack = require("./saltstack");
const device =   require("./device");
const group = require("./group");

function route(app) {
  app.use("/user", userRouter);
  app.use("/authen", authenRouter);
  app.use("/test", testRouter);
  app.use("/devicetype", deviceTypeRouter);
  app.use("/upload",testUpload);
  app.use("/saltstack",saltstack);
  app.use("/group",group);
  app.use('/version',versionRouter);
  // app.use('/devices',device);
  // app.use('/reports', reports);
  // app.use('/loggings',loggoings);
  // app.use('/objects',object);
  app.use("/", (req, res, next) => {
    res.json({
      message: "Welcome BKAV UPDATE CENTER !",
    });
  });
}

module.exports = route;
