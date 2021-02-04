const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const Version = require('./Version');
const DeviceType = new Schema({
  idUser:{type: String},
  name: { type: String },
  description:{type: String},
  version:{type:[Version.schema],default:[]},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("DeviceType", DeviceType);
