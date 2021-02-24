const groupModel = require("../models/GroupDevice");

class DeviceService {
  //GET
//   async queryAllGroup() {
//     return await groupModel
//       .find({})
//       .exec()
//       .then((devicetype) => {
//         if (devicetype == null) {
//           throw new Error("query device Type error");
//         }
//         return devicetype;
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }
//   //GET
//   async queryWithId(id) {
//     return await groupModel
//       .findById(id)
//       .exec()
//       .then((device) => {
//         if (device == null) {
//           throw new Error("invalid deviceType");
//         }
//         return device;
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }

//   POST
//   async createGroup(name, path,typeUpdate) {
//     var newGroup = new groupModel();
//     newGroup.name = name;
//     newGroup.path = path;
//     // newGroup.updateType = typeUpdate;
    
//     return await deviceTypeModel
//       .findOne({ name: name })
//       .exec()
//       .then(async (user) => {
//         if (user != null) {
//           throw new Error(`Group is exists`);
//         }
//         try {
//           let result = await newGroup.save();
//           console.log(`create Group =${result}`);
//           return result;
//         } catch (err) {
//           throw new Error(err.message);
//         }
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }
//   async addVersion(version, idDeviceType) {
//     return await deviceTypeModel
//       .findById(idDeviceType)
//       .exec()
//       .then(async (devicetype) => {
//         if (devicetype == null) {
//           throw new Error(`invalid Device Type`);
//         }

//         try {
//           devicetype.version.push(version);
//           let result = await devicetype.save();
//           return result;
//         } catch (err) {
//           throw new Error(err.message);
//         }
//       })
//       .catch((err) => {
//         throw new Error(err.message);
//       });
//   }
}

module.exports = new DeviceService();
