const axios = require("axios");
class SaltAPI {
	async initToken(){
		const data = {
			username: "saltapi",
			password: "saltapi",
			eauth: "pam",
		  };
		try {
			const res = await axios.post("https://saltgui.bkav.com/api/login", data)
			return res.data.return[0].token;
		} catch (error) {
			console.log(error);
		}
		// return res.data.return[0].token;
	}
}

module.exports = new SaltAPI;
