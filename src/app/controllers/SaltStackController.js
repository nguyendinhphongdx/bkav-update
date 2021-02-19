const saltService = require("../service/SaltStackService");

class SaltStackController {
    async testPing(req, res) {
        let fun = req.body.fun;
        let nameDevice = req.body.nameDevice;
        await saltService.testPing(fun, nameDevice)
          .then((ping) => {
            // responeInstance.success200(
            //   res,
            //   jsonInstance.toJsonWithData(`SUCCESS`, ping)
            // );
          })
          .catch((err) => {
            responeInstance.error400(res, jsonInstance.jsonNoData(err.message));
          });
      }
    
}

module.exports = new SaltStackController();
