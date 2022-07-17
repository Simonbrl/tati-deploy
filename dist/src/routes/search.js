"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const product_1 = __importDefault(require("../models/product"));
router.get('/:search', (req, res) => {
    product_1.default.find({ name: { $regex: req.params.search, $options: 'i' } }, (err, docs) => {
        if (!err)
            res.send(docs);
        else
            console.log('Error : ' + err);
    });
});
module.exports = router;
