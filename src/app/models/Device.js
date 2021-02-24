const mongosee = require("mongoose");
const Schema = mongosee.Schema;
const Gateway = require("./smsGateway");
const Alert  = require("./Alert");
const User = require("./User");
const Licence = require("./Licence");
const Group = require("./GroupDevice");
const Version = require("./Version");

const Device = new Schema({
  deviceName:{type: String},
  updateType: {
    type: String,
    enum: ["auto", "manual"],
    default: "manual",
  },
  currentVersion:{type:[Version.schema],default:[]},
  smsGateway:{type:[Gateway.schema],default:[]},
  user: {type:[User.schema],default:[]},
  path: {type:String},
  ipAdress:{type: String},
  alert:{type: [Alert.schema],default:[]},
  licence:{type:[Licence.schema],default:[] },
  // groupName:{type:Group.schema,default:[]},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
module.exports = mongosee.model("Device", Device);
