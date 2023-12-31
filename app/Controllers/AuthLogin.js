const bcrypt = require('bcrypt');
const BaseController = require("./BaseController.js");
class AuthLogin extends BaseController {
    cekLogin = async (req, res) => {
        const {
            username,
            password,
        } = req.body;
        let rules = {
            username: {
                required: true
            },
            password: {
                required: true
            }
        }
        let cekValid = await this.valid(rules).check()(req, res);
        if (cekValid && cekValid.length > 0) {
            return res.status(400).json({
                status: 400,
                response: cekValid
            });
        }



        this.user.where('username', username).getResult().then(
            hasil => {
                console.log(password);
                console.log(hasil);
                var cekPw = bcrypt.compareSync(password, hasil.password);
                console.log(cekPw);
                if (cekPw == true) {
                    var data = {
                        username: hasil.username,
                        logged_in: true,
                        fullname: hasil.fullname,
                        avatar: hasil.avatar,
                        userid: hasil.id,
                        role: hasil.role_id
                    };
                    var response = {
                        status: 200,
                        response: data
                    }
                    res.status(200).json(response);
                } else {
                    var response = {
                        status: 400,
                        response: "Wrong Password"
                    }
                    res.status(400).json(response);
                }
            }
        ).catch((error) => {
            var response = {
                status: 400,
                response: "Username Not Found",
                message: error.message,
                data: {
                    username: username,
                    password: password
                }
            }
            res.status(400).json(response);
        }
        );
    }
}

module.exports = AuthLogin;