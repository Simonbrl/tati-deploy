"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt = require('bcrypt');
const router = express_1.default.Router();
const user_1 = __importDefault(require("../models/user"));
router.post('/', (req, res) => {
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 10);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let birthdate = req.body.birthdate;
    if (email && password && firstname && lastname && birthdate) {
        user_1.default.findOne({ email: email }, (err, docs) => {
            if (!err)
                if (docs)
                    res.send({ message: "exists" });
                else {
                    let user = new user_1.default({
                        firstname: firstname,
                        lastname: lastname,
                        password: password,
                        email: email,
                        phone: '',
                        delivery_address: '',
                        invoice_address: '',
                        birthdate: birthdate,
                        rank: 0,
                        date_creation: new Date(),
                        last_login: new Date()
                    });
                    user.save((err) => {
                        if (!err)
                            res.send({ message: "success" });
                        else
                            console.log('Error : ' + err);
                    });
                }
            else
                console.log('Error : ' + err);
        });
    }
    else
        res.send({ message: "empty" });
});
module.exports = router;
