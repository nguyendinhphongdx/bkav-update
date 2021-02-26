const deviceTypeModel = require("../models/DeviceType");
const versionService = require("../service/VersionService");
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
          devicetype.versions.push(version);
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
  async deleteDeviceType(idGroup) {
    console.log(idGroup);
    return await deviceTypeModel
      .findById(idGroup)
      .exec()
      .then(async (devicetype) => {
        if (devicetype == null) {
          throw new Error(`invalid devicetype`);
        }
        try {
          console.log(`Device Type ${devicetype}`);
          let result = await deviceTypeModel.findByIdAndDelete(devicetype._id);
          return result;
        } catch (err) {
          throw new Error(err.message);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
  async deleteVersion(idDeviceType, idVersion) {
    return await deviceTypeModel
      .findById(idDeviceType)
      .exec()
      .then(async (deviceType) => {
        if (deviceType == null) {
          new Error(`invalid Service`);
        }
        console.log(deviceType);
        // let version = deviceType.versions.filter(item => item._id == idVersion).first()
        const ver = deviceType.version.filter(
          (version) => version._id == idVersion
        );
        console.log("VER " + ver);
        try {
          console.log("VER " + deviceType);
          // deviceType.version.removeAt(ver._id)
          deviceType.version.removeWith(ver);
          console.log("Device.Version " + deviceType.version.removeWith(ver));
          // let result = await deviceType.save();
          // await versionService.deleteVersion(version._id);
          // return result;
        } catch (error) {
          throw new Error(error.message);
        }
      });
  }
  async deleteVersion1(idDeviceType, idVersion) {
    console.log(idDeviceType + idVersion);
    return await deviceTypeModel
      .findById(idDeviceType)
      .exec()
      .then(async (device) => {
        if (device == null) {
          throw new Error(`invalid device`);
        }
        try {
          let ver = device.versions.filter((item) => item._id == idVersion);
          // device.versions.removeWithId(ver);
          console.log("vER" + ver);
          console.log(device.version.findByIdAndDelete(ver._id));
          let result = await device.save();
          // await RoomService.deleteRoom(room._id, idUser)

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
