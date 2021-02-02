const jsonInstance = require('../utils/JsonUtils');
const responeInstance = require('../utils/ResponeUtils');
const { validationResult } = require('express-validator');
const authenService = require('../service/AuthenService');
const userService  = require('../service/UserService')

class AuthenController {
  //POST
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance
        .error422(res, jsonInstance.jsonNoData({ errors: errors.array() }));
      return;
    }

    var respone = {
      password: req.body.password,
      username: req.body.username,
      eauth: req.body.eauth
    };

    if (respone.password && respone.username && respone.eauth) {
      await authenService.loginWithSatl(respone.username, respone.password,respone.eauth)
      .then(async (user) => {
        await userService.create(user.username,respone.password,user.eauth,user.start,user.expire)
        .then(async (add) => {
          responeInstance.success200(res,jsonInstance.toJsonWithData('add user sucess',add))
        })
      })
      .catch((err) => {
        responeInstance
          .error400(res, jsonInstance.jsonNoData(err.message));
      })

  } else {
    responeInstance
      .error400(res, jsonInstance.jsonNoData("error query"));
  }
}

  async logout(req, res) {
    let id = req.params.id

    await authenService.logoutWithId(id)
      .then((user) => {
        responeInstance
          .success200(res, jsonInstance.toJsonWithData(`LOGOUT SUCCCESS!`, user));
      })
      .catch((err) => {
        responeInstance
          .error400(res, jsonInstance.jsonNoData(err.message));
      })
  }

}
module.exports = new AuthenController;