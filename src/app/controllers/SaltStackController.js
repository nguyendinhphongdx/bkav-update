const saltService = require("../service/SaltStackService");
const jsonInstance = require("../utils/JsonUtils");
const responeInstance = require("../utils/ResponeUtils");

class SaltStackController {
  async func(req, res) {
    var respone = {
      fun: req.body.fun,
      tgt: req.body.tgt,
    };
    await saltService
      .func(respone.fun, respone.tgt)
      .then((ping) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, ping)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async fullargs(req, res) {
    var respone = {
      fun: req.body.fun,
      tgt: req.body.tgt,
      kwarg: req.body.kwarg,
    };
    await saltService
      .fullargs(respone.fun, respone.tgt, respone.kwarg)
      .then((data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, data)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async getKeyNameDevice(req, res) {
    let device = req.params.device;
    await saltService
      .getKeyNameDevice(device)
      .then((data) => {
        responeInstance.success200(
          res,
          jsonInstance.toJsonWithData(`SUCCESS`, data)
        );
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      });
  }
  async getMinions(req, res) {
    await saltService
    .getMinionns()
    .then((data) => {
      responeInstance.success200(
        res,
        jsonInstance.toJsonWithData(`SUCCESS`, data)
      );
    })
    .catch((err) => {
      responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    });
  }
}

module.exports = new SaltStackController();
