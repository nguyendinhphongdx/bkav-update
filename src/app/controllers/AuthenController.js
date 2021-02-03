const jsonInstance = require('../utils/JsonUtils');
const responeInstance = require('../utils/ResponeUtils');
const { validationResult } = require('express-validator');
const authenService = require('../service/AuthenService');
const userService  = require('../service/UserService')
const {authuShema} = require('../validate/authenSchema');
const createError = require('http-errors')
const userModel = require('../models/User');
const { signRefreshToken, signAccessToken } = require('../helpers/jwt_helper');
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
      username: req.body.username
    };
    if (respone.password && respone.username) {
      const result = await authuShema.validateAsync(respone);
      await authenService.loginWithSalt(result)
        .then((user) => {
          console.log("user DCM" +user);
          responeInstance
            .success200(res, jsonInstance.toJsonWithData(`LOGIN SUCCCESS!`, user));
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