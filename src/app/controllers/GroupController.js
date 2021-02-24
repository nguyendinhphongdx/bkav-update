const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const { validationResult } = require("express-validator");
const authenService = require("../service/AuthenService");
const groupService = require("../service/GroupService");
const { authuShema } = require("../validate/authenSchema");
const createError = require("http-errors");
const versionSerive = require("../service/VersionService");
class GroupController {
  //POST
  async createGroup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array() })
      );
      return;
    }
    var respone = {
      name: req.body.name,
      path: req.body.path,
      updateType: req.body.updateType
    };
    await groupService
      .createGroup(respone.name, respone.path,respone.updateType)
      .then((device) => {
        responeInstance.success200(res,jsonInstance.toJsonWithData(`ADD SUCCCESS!`, device)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
 
}

module.exports = new GroupController();
