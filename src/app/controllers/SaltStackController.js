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
    .then( async (data) => {
    console.log("DATA" + data);
      responeInstance.success200(res,jsonInstance.toJsonWithData(`SUCCESS`,data))
      // for (let i = 0; i < data.length; i++)
      //   {
      //       const element = data[0][i];
      //       console.log("element " + data[0][i].dns);
  
      //   }
     
    })
    .catch((err) => {
      responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
    });
  }
  async funcKeys(req,res){
    var respone = {
      fun: req.body.fun,
      client: req.body.client,
      match: req.body.match
     
    };
    if(respone.client && respone.match && respone.fun){
      await saltService.funcKeys(respone.fun,respone.client,respone.match)
      .then((data)=>{
        responeInstance.success200(res,jsonInstance.toJsonWithData(`SUCCESS`,data))
      })
      .catch((err) => {
        responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
      })
    }
    // await saltService.funcKeys()
  }
}

module.exports = new SaltStackController();
