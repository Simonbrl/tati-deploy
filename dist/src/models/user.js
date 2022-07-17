"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    product: { type: String },
    quantity: { type: Number },
}, { _id: false, versionKey: false });
const orderSchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    products: [productSchema],
    total: { type: Number },
    date: { type: Date },
}, { versionKey: false });
const userSchema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    birthdate: { type: Date },
    invoice_address: { type: String },
    delivery_address: { type: String },
    phone: { type: String },
    rank: { type: Number },
    orders: [orderSchema],
    date_creation: { type: Date },
    last_login: { type: Date },
}, { versionKey: false });
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
