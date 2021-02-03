const mongosee = require('mongoose');
const bcrypt   = require("bcrypt");
const Schema =  mongosee.Schema;

const User = mongosee.Schema({
  username: { type: String, maxLength: 100 },
  password: { type: String, minLength: 6, maxLength: 1000 },
  token:{type: String},
  refresh_token:{type: String},
  start:{type: String},
  expire:{type: String},
  numberphone: {type: String},
  permission:{
    type: String,        
    enum:['user','admin'],
    default: 'admin'
  },
  createAt: { type: Number, default: Date.now().valueOf() },
  updateAt: { type: Number, default: Date.now().valueOf() },
});
User.pre('save', async function (next) {
  try {
      const salt = await bcrypt.genSalt(10);
      const hahedPassword = await bcrypt.hash(this.password, salt);
      this.password = hahedPassword;
      this.confirmPassword = hahedPassword;
      next();
  } catch (error) {
      next(error);
  }
})
User.methods.isValidPassword = async function (password) {
  try {
      return await bcrypt.compare(password, this.password);
  } catch (error) {
      throw error
  }
}

module.exports = mongosee.model('User', User);