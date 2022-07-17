"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt = require('bcrypt');
const user_1 = __importDefault(require("../models/user"));
router.post('/', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    if (email && password) {
        user_1.default.findOne({ email: email }, (err, docs) => {
            if (!err)
                if (docs) {
                    bcrypt.compare(password, docs.password, (err, result) => {
                        if (result) {
                            docs.last_login = new Date();
                            docs.save();
                            res.cookie('user', {
                                id: docs._id,
                                firstname: docs.firstname,
                                lastname: docs.lastname,
                                email: docs.email
                            }, { httpOnly: true, sameSite: true });
                            res.send(docs);
                        }
                        else
                            res.send(false);
                    });
                }
                else
                    res.send(false);
            else
                console.log('Error : ' + err);
        });
    }
    else
        res.send(false);
});
module.exports = router;
