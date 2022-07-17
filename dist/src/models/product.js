"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imagesSchema = new mongoose_1.Schema({
    enabled: { type: Boolean },
    name: { type: String },
    filename: { type: String },
    filename_small: { type: String }
}, { _id: false, versionKey: false });
const productSchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    name: { type: String },
    keyname: { type: String },
    reference: { type: String },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'category' },
    prices: {
        base: { type: Number },
        plus: { type: Number }
    },
    images: [imagesSchema],
    main_image: { type: Number },
    description: { type: String },
    short_description: { type: String },
    keywords: [{ type: String }]
}, { versionKey: false });
const Product = (0, mongoose_1.model)('product', productSchema);
exports.default = Product;
