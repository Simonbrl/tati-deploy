"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = __importDefault(require("../models/user"));
router.get('/cookie', (req, res) => {
    if (req.cookies.user)
        res.send(req.cookies.user);
    else
        res.send(false);
});
router.get('/:id', (req, res) => {
    user_1.default.findById(req.params.id, (err, docs) => {
        if (!err)
            res.send(docs);
        else
            console.log('Error : ' + err);
    });
});
module.exports = router;
