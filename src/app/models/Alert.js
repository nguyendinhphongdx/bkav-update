const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const Alert = new Schema({
  typeSend:{type: String},
  mailSender: { type: Number },
  mailServer:{type: Number},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("Alert", Alert);
