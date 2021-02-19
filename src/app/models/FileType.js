const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const FileType = new Schema({
  fieldname:{type: String},
  originalname: { type: String },
  mimetype: { type: String },
  destination: { type: String },
  filename: { type: String },
  path: { type: String },
  size:{type: Number},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("FileType", FileType);
