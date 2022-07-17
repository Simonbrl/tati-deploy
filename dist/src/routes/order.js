"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = __importDefault(require("../models/user"));
router.post('/create/new', (req, res) => {
    let email = req.body.user;
    let products = req.body.products;
    let total = req.body.total;
    let order = {
        products: products,
        total: total,
        date: new Date()
    };
    user_1.default.findOne({ email: email }, (err, docs) => {
        if (!err)
            if (docs) {
                docs.orders.push(order);
                docs.save();
                res.send({ message: 'success' });
            }
            else
                res.send({ message: 'user not found' });
        else
            console.log('Error : ' + err);
    });
});
router.get('/get', (req, res) => {
    let email = req.cookies.user.email;
    user_1.default.findOne({ email: email }, (err, docs) => {
        if (!err)
            if (docs)
                res.send(docs.orders);
            else
                res.send({ message: 'user not found' });
        else
            console.log('Error : ' + err);
    });
});
module.exports = router;
