const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const mailSender = new Schema({
  email:{type: String},
  passwored: { type: Number },
  serverId: { type: Number},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("mailSender", mailSender);
