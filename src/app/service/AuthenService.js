const userModel = require('../models/User');
const axios     = require('axios');
const { header } = require('express-validator');
const BASE_URL = `https://10.2.65.34:3000`
class AuthenService {

  //GET
  async loginWithUsername(usrname, password) {
    
    return await userModel.findOne({ username: usrname, password: password })
      .exec()
      .then(async (user) => {
        if (user == null) {
          throw new Error(`wrong username or password`)
        }

        try {
          user.status = true
          let result = await user.save()

          return result
        } catch (err) {
          throw new Error(err.message)
        }

      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

  //POST
  async loginWithSatl(username, password,eauth) {
      try {
        // fetch data from a url endpoint
        const dataUser = await axios.post('https://saltgui.bkav.com/api/login',{
          username: username,
          password: password,
          eauth: eauth
        },{ headers:{ 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"}})
        return dataUser.data.return[0];
      } catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
      console.log("DATA"+dataUser);

  }
  async logoutWithId(idUser) {

    return await userModel.findByIdAndUpdate(idUser, {status: false}, {new: true})
      .exec()
      .then((user) => {
        if (user == null) {
          throw new Error(`wrong mail or password`)
        }

        return user
      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }



}

module.exports = new AuthenService;
