const jsonInstance = require('../utils/JsonUtils');
const responeInstance = require('../utils/ResponeUtils');
const { validationResult } = require('express-validator');

const userService = require('../service/UserService');
const fs = require('fs');

class UserController {
  //GET
  async queryAll(_, res) {

    await userService.queryAll()
      .then((users) => {
        responeInstance
          .success200(res, jsonInstance.toJsonWithData(`SUCCESS`, users));
      })
      .catch((err) => {
        responeInstance
          .error400(res, jsonInstance.jsonNoData(err.message));
      })
  }

  async getAvatar(req, res) {
    let idUser = req.params.id
    // let image = req.file.image

    await userService.getAvatar(idUser)
      .then((user) => {

        responeInstance
          .success200(res, jsonInstance.toJsonWithData(`SUCCESS`, user));
      })
      .catch((err) => {
        responeInstance
          .error400(res, jsonInstance.jsonNoData(err.message));
      })
  }

  async changeAvatar(req, res) {
    let idUser = req.params.id

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    var image = new Buffer(encode_image, 'base64')

    var metadata = {
        contentType: req.file.mimetype
    };
    var filename = req.file.filename
    if (!filename) {
      filename = Data.now().valueOf().toString()
    }

    await userService.changeAvatar(idUser, req.file.filename, image, metadata)
      .then((user) => {

        responeInstance
          .success200(res, jsonInstance.toJsonWithData(`SUCCESS`, user));
      })
      .catch((err) => {
        responeInstance
          .error400(res, jsonInstance.jsonNoData(err.message));
      })
  }

  async changePassword(req, res) {
    let idUser = req.params.id
    let oldPassword = req.body.oldPassword
    let newPassword = req.body.newPassword

    if (idUser && oldPassword && newPassword) {
      await userService.changePassword(idUser, oldPassword, newPassword)
        .then((user) => {

          responeInstance
            .success200(res, jsonInstance.toJsonWithData(`change password successfully`, user));
        })
        .catch((err) => {
          responeInstance
            .error400(res, jsonInstance.jsonNoData(err.message));
        })
    } else {
      responeInstance
        .error400(res, jsonInstance.jsonNoData(`url error`));
    }

  }

  async query(req, res) {
    let id = req.params.id
    if (id != null) {

      await userService.queryWithId(id)
        .then((user) => {
          responeInstance
            .success200(res, jsonInstance.toJsonWithData(`SUCCESS`, user));
        })
        .catch((err) => {
          responeInstance
            .error400(res, jsonInstance.jsonNoData(err.message));
        })

    } else {
      responeInstance
        .error400(res, jsonInstance.jsonNoData(`url error`));
    }
  }

  //POST
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance
        .error422(res, jsonInstance.jsonNoData({ errors: errors.array() }));
      return;
    }

    var respone = {
      username: req.body.username,
      password: req.body.password,
      token: req.body.token,
      eauth:req.body.eauth,
      start:req.body.start,
      expire:req.body.expire
    };

    await userService.create(
      respone.username, respone.password, respone.token,
      respone.start, respone.eauth, respone.expire
    ).then((user) => {
      responeInstance
        .success200(res, jsonInstance.toJsonWithData(`ADD SUCCCESS!`, user));
    }).catch((err) => {
      responeInstance
        .error400(res, jsonInstance.jsonNoData(err.message));
    })
  }



  validateParam = (param) => {
    return (
      param == "user" || param == "password" | param == "mail" ||
      param == "status" || param == "city" || param == "numberphone"
    )
  }
}
module.exports = new UserController;