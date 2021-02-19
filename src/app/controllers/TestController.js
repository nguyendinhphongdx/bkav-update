
const jsonInstance = require('../utils/JsonUtils');
const responeInstance = require('../utils/ResponeUtils');
const { validationResult } = require('express-validator');
const authenService = require('../service/AuthenService');
const userService  = require('../service/UserService');
const SaltAPI = require('../helpers/saltApi');
const netapi  = require('../helpers/netApi');
const SaltHelper = require('../helpers/SaltHelper');


class TestController {
    async test(req,res){
        const salt = new Salt({
            url: "https://saltgui.bkav.com/api",
            username: "saltapi",
            password: "saltapi",
        });
        
        salt.ready.then(()=>{
            // Same as running `salt "*" test.ping` in the command line
            salt.fun("*", "test.ping").then(data => {
                console.log("HIIHIHIHIHI");
                // Do something with the data
                console.log("data.return[0]"+ data.statusCode);
                // { return: [ { b827eb3aaaf7: true, b827ebcc82fe: true } ] }
                return data;
        
            }).catch(e => console.error(e));

        })
    }
    async testPing(req, res){
        const result = await netapi.testPing();
        console.log("resulut testPing    --->  " + result.statusCode);
    }

}
module.exports = new TestController;