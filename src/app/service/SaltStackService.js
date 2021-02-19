const deviceTypeModel = require("../models/DeviceType");
const {constanst} = require("../config/Constants")

class SaltStackService {

  //POST
  async testPing(tgt,fun, arg=false, kwarg=false, client="local", pillar=false, timeout=false) {
    const token = await saltApi.initToken();
    console.log('TOKEN '+ token);
    let form = { tgt, fun, client }
    if(arg) form.arg = arg;
    if(kwarg) form.kwarg = kwarg;
    if(pillar) form.pillar = pillar;
    if(timeout) form.timeout = timeout;
        try {
            const res = await axios.post('https://saltgui.bkav.com/api/',form,{
                headers: {"X-Auth-Token": token},
                contentType: 'application/json'
            })
            return res.data.return[0];
            
        } catch (error) {
            console.log(error);
        }
    }
  //GET
  async queryWithId(id) {
    return await deviceTypeModel
      .findById(id)
      .exec()
      .then((device) => {
        if (device == null) {
          throw new Error("invalid deviceType");
        }
        return device;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }

  //POST
  async createDeviceType(name, description) {
    var newDeviceType = new deviceTypeModel();
    newDeviceType.name = name;
    newDeviceType.description = description;
    return await deviceTypeModel
      .findOne({ name: name })
      .exec()
      .then(async (user) => {
        if (user != null) {
          throw new Error(`deviceType is exists`);
        }
        try {
          let result = await newDeviceType.save();
          console.log(`create DeviceType =${result}`);
          return result;
        } catch (err) {
          throw new Error(err.message);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
  async addVersion(version, idDeviceType) {
    return await deviceTypeModel
      .findById(idDeviceType)
      .exec()
      .then(async (devicetype) => {
        if (devicetype == null) {
          throw new Error(`invalid Device Type`);
        }

        try {
          devicetype.version.push(version);
          let result = await devicetype.save();
          return result;
        } catch (err) {
          throw new Error(err.message);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}

module.exports = new SaltStackService();
