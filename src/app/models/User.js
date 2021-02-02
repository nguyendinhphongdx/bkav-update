const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const User = new Schema({
  username: { type: String, maxLength: 100 },
  password: { type: String, minLength: 6, maxLength: 30 },
  token:{type: String},
  start:{type: String},
  user:{type: String},
  expire:{type: String},
  eauth:{type: String},
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() }

});

module.exports = mongosee.model('User', User);