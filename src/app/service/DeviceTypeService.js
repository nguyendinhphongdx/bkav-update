const deviceTypeModel = require("../models/DeviceType");
class DeviceTyeService {
  //GET
  async queryAllDeviceType() {
    return await deviceTypeModel
      .find({})
      .exec()
      .then((devicetype) => {
        if (devicetype == null) {
          throw new Error("query device Type error");
        }
        return devicetype;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
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

module.exports = new DeviceTyeService();
