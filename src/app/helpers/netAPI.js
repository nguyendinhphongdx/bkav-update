const request = require("https");
const axios = require("axios");
const saltApi = require("../helpers/saltApi");

class netApi {
 async testPing(tgt="*", fun="test.ping", arg=false, kwarg=false, client="local", pillar=false, timeout=false) {
    const token = await saltApi.initToken();
    console.log('TOKEN '+ token);
    let form = { tgt, fun, client }
    if(arg) form.arg = arg;
    if(kwarg) form.kwarg = kwarg;
    if(pillar) form.pillar = pillar;
    if(timeout) form.timeout = timeout;
        try {
            const res = await axios.post('https://saltgui.bkav.com/api/',form,{
                headers: {"X-Auth-Token": token},
                contentType: 'application/json'
            })
            return res.data.return[0];
        } catch (error) {
            console.log(error);
        }
        return res;
    }

}

module.exports = new netApi;
