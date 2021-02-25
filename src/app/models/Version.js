const mongoose = require("mongoose");
const FileType = require("./FileType");
const Version = new mongoose.Schema({
  idDeviceType: { type:String},
  versionName: { type: String },
  typeFile: { type: String },
  totalSize: { type: Number },
  description: { type: String },
  idDeviceType:{type:String},
  fieldname: { type:String},
  originalname: { type:String },
  encoding: { type: String },
  minetype: { type:String},
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size: { type: Number},
  // fileType:{type:[FileType.schema],default:[]},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});

module.exports = mongoose.model("Version", Version);
