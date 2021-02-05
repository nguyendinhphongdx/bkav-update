const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const smsServer = new Schema({
  serverName:{type: String},
  description: { type: String },
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("smsServer", smsServer);
