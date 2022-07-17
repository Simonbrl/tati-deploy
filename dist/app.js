"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config({ path: __dirname + '/.env' });
var bodyParser = require('body-parser');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
require(__dirname + '/src/config/db.config');
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use('/api/products', require(__dirname + '/src/routes/product'));
app.use('/api/categories', require(__dirname + '/src/routes/category'));
app.use('/api/users', require(__dirname + '/src/routes/user'));
app.use('/api/login', require(__dirname + '/src/routes/login'));
app.use('/api/logout', require(__dirname + '/src/routes/logout'));
app.use('/api/register', require(__dirname + '/src/routes/register'));
app.use('/api/search', require(__dirname + '/src/routes/search'));
app.use('/api/orders', require(__dirname + '/src/routes/order'));
app.use(express_1.default.static(__dirname + '/client/build'));
app.listen(PORT, () => console.log(`${'../' + __dirname}server is listening on ${PORT}`));
