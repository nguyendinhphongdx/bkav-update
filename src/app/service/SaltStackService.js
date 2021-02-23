const deviceTypeModel = require("../models/DeviceType");
const { constanst } = require("../config/Constants");
const saltApi = require("../helpers/saltApi");
const axios = require("axios");

class SaltStackService {
  //POST TO GET DATA IN FUNCTION
  async func(fun, tgt) {
    let arg = false;
    let kwarg = false;
    let client = "local";
    let pillar = false;
    let timeout = false;
    const token = await saltApi.initToken();
    console.log("TOKEN " + token);
    let form = { tgt, fun, client };
    if (arg) form.arg = arg;
    if (kwarg) form.kwarg = kwarg;
    if (pillar) form.pillar = pillar;
    if (timeout) form.timeout = timeout;
    console.log("Form" + JSON.stringify(form));
    try {
      const res = await axios.post("https://saltgui.bkav.com/api/", form, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.return[0];
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  //POST FUNCTION SALTSTACK WITH KWARG
  async fullargs(fun, tgt, kwarg) {
    let arg = false;
    let client = "local";
    let pillar = false;
    let timeout = false;
    const token = await saltApi.initToken();
    let form = { tgt, fun, client, kwarg };
    if (arg) form.arg = arg;
    if (kwarg) form.kwarg = kwarg;
    if (pillar) form.pillar = pillar;
    if (timeout) form.timeout = timeout;
    console.log("Form" + JSON.stringify(form));
    try {
      const res = await axios.post("https://saltgui.bkav.com/api/", form, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.return[0];
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  async getKeyNameDevice(deviceName) {
    const token = await saltApi.initToken();
    try {
      const res = await axios.get(
        `https://saltgui.bkav.com/api/keys/${deviceName}`,
        {
          headers: { "X-Auth-Token": token },
          contentType: "application/json",
        }
      );
      console.log(res.data.return.minions.name);
      return res.data.return.minions;
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  //POST
  async getMinionns() {
    const token = await saltApi.initToken();
    let data = [];
    try {
      const res = await axios.get(
        "https://saltgui.bkav.com/api/minions",
        {
          headers: { "X-Auth-Token": token },
          contentType: "application/json",
        }
      );
      // console.log("Minions "+ JSON.stringify(res.data.return[0]));
      // data.push(res.data.return[0])
      // console.log("ARRAY" + data.length);
      // console.log("arrray data base  " + JSON.stringify(Object.entries(res.data.return[0])));
      return Object.entries(res.data.return[0]);
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
  //POST
  async funcKeys(fun, client, match) {
    const token = await saltApi.initToken();
    let form = { fun, client, match };
    if (fun) form.fun = fun;
    if (client) form.client = client;
    if (match) form.match = match;
    console.log("Form" + JSON.stringify(form));
    try {
      const res = await axios.post("https://saltgui.bkav.com/api/", form, {
        headers: { "X-Auth-Token": token },
        contentType: "application/json",
      });
      return res.data.return[0];
    } catch (error) {
      console.log("error Service" + error.message);
    }
  }
}

module.exports = new SaltStackService();
