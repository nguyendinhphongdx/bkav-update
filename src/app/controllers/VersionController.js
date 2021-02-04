const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");
const { validationResult } = require("express-validator");
const versionService = require("../service/VersionService");
const createError = require("http-errors");
class VersionController {
  //POST
  async createVersion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responeInstance.error422(
        res,
        jsonInstance.jsonNoData({ errors: errors.array()})
      );
      return;
    }
    var respone = {
      versionName: req.body.versionName,
      description: req.body.description
    };
    let idDeviceType = req.params.idDeviceType
    await versionService
      .createVersion(respone.name,respone.description,idDeviceType)
      .then((version) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`ADD SUCCCESS!`, version)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
}

module.exports = new VersionController();
