const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const smsGateway = new Schema({
  totalSms:{type: String},
  pass: { type: Number },
  drop:{type: Number},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("smsGateway", smsGateway);
