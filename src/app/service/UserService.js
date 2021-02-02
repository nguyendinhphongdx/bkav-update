const userModel = require('../models/User');
class UserService {
  //GET
  async queryAll() {
    return await userModel.find({})
      .exec()
      .then((users) => {
        if (users == null) {
          throw new Error("query error");
        }
        return users
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }

  async queryWithId(id) {

    return await userModel.findById(id)
      .exec()
      .then((user) => {
        if (user == null) {
          throw new Error("invalid user");
        }
        return user
      })
      .catch((err) => {
        throw new Error(err.message);
      })
  }

  //POST
  async create(fullname, password, mail, status, city, numberphone, image) {
    var newUser = new userModel();
    newUser.fullname = fullname
    newUser.password = password
    newUser.mail = mail
    newUser.status = status
    newUser.city = city
    newUser.numberphone = numberphone

    newUser.image = image

    return await userModel.findOne({ mail: mail })
      .exec()
      .then(async (user) => {
        if (user != null) {
          throw new Error(`mail is exists`)
        }

        try {
          let result = await newUser.save()

          console.log(`create user =${result}`)

          return result
        } catch (err) {
          throw new Error(err.message)
        }

      })
      .catch((err) => {
        throw new Error(err.message)
      })
  }

 
  validateParam(param) {
    return (
      param == "user" || param == "password" | param == "mail" ||
      param == "status" || param == "city" || param == "numberphone"
    )
  }
}

module.exports = new UserService;