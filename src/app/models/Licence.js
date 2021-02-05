const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const Licence = new Schema({
  licenceCode:{type: String},
  timeCreate: { type: String },
  timeExpired: { type: Number},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("Licence", Licence);
