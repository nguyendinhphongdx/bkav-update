
const jsonInstance = require('../utils/JsonUtils');
const responeInstance = require('../utils/ResponeUtils');
const { validationResult } = require('express-validator');
const authenService = require('../service/AuthenService');
const userService  = require('../service/UserService');
const SaltAPI = require('../helpers/saltApi');


class TestController {
    async test(req,res){
        // const salt = new Salt({
        //     url: "https://saltgui.bkav.com/api",
        //     username: "saltapi",
        //     password: "saltapi",
        //     eauth:"pam"
            
        // });
        const saltapi = new SaltAPI({
            url:"https://saltgui.bkav.com/api",
            username:"saltapi",
            password:"saltapi"
        })
        SaltAPI.ready.then(()=>{
            // Same as running `salt "*" test.ping` in the command line
            salt.fun("*", "test.ping").then(data => {
                console.log("HIIHIHIHIHI");
                // Do something with the data
                console.log("data.return[0]"+ data.statusCode);
                // { return: [ { b827eb3aaaf7: true, b827ebcc82fe: true } ] }
        
            }).catch(e => console.error(e));

        })
    }

}
module.exports = new TestController;