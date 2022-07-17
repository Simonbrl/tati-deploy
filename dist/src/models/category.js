"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    name: { type: String },
    keyname: { type: String },
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'category' },
    image: { type: String }
}, { versionKey: false });
const Category = (0, mongoose_1.model)('category', categorySchema);
exports.default = Category;
