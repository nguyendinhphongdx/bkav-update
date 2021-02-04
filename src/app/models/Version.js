const mongoose = require("mongoose");

const Version = new mongoose.Schema({
  versionName: { type: String },
  typeFile: { type: String },
  totalSize: { type: Number },
  description: { type: String },
  idDeviceType:{type:String},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});

module.exports = mongoose.model("Version", Version);
