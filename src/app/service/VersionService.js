const versionModel = require('../models/Version');
class DeviceTyeService {
  //GET
  async queryAllVersion() {
    return await versionModel.find({})
      .exec()
      .then((version) => {
        if (version == null) {
          throw new Error("query version error");
        }
        return version
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }
  //GET
  async queryWithId(id) {
    return await versionModel.findById(id)
      .exec()
      .then((version) => {
        if (version == null) {
          throw new Error("invalid version");
        }
        return version
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }

  //POST
  async createVersion(versionName,description,fieldname,originalname,encoding,minetype,destination,filename,path,size) {
    var newVersion = new versionModel();
    newVersion.versionName = versionName
    newVersion.description = description
    newVersion.fieldname  = fieldname
    newVersion.originalname = originalname
    newVersion.encoding = encoding
    newVersion.minetype = minetype
    newVersion.destination = destination
    newVersion.fieldname = filename
    newVersion.path = path
    newVersion.size = size
    return await versionModel.findOne({ versionName: versionName })
      .exec()
      .then(async (version) => {
        if (version != null) {
          throw new Error(`version is exists`)
        }
        try {
          let result = await newVersion.save();
          console.log(`create version =${result}`)
          return result
        } catch (err) {
          throw new Error(err.message)
        }
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }
  async deleteVersion(idVersion) {
    console.log(idVersion);
    return await versionModel.findById(idVersion)
      .exec()
      .then(async (version) => {
        if (version == null) {
          console.log("Version" + version);
          throw new Error(`invalid version`)
        }
        try {
          console.log(`Version ${version}`);
          let result = await versionModel.findByIdAndDelete(version._id)
          return result;
        } catch (err) {
          throw new Error(err.message)
        }
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

}

module.exports = new DeviceTyeService;