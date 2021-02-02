const { version }    = require('mongoose');
const userRouter     = require('./user');
const authenRouter   = require('./authen');
const versionRouter  = require('./version');
const testRouter     = require('./test');
function route(app) {
    app.use('/user', userRouter);
    app.use('/authen',authenRouter);
    app.use('/test',testRouter);
    // app.use('/versions',version);
    // app.use('/devices',device);
    // app.use('/reports', reports);
    // app.use('/loggings',loggoings);
    // app.use('/objects',object);
    app.use('/',(req, res, next) =>{
      res.json({
          message:'Welcome BKAV UPDATE CENTER !'
      })
  });
  }
  
  module.exports = route;
  