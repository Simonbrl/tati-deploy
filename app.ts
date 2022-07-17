import express, { Express } from 'express';
require('dotenv').config({ path: __dirname+'/.env' });
var bodyParser = require('body-parser')

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

require(__dirname+'/src/config/db.config')

app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use('/api/products', require(__dirname+'/src/routes/product'));
app.use('/api/categories', require(__dirname+'/src/routes/category'));
app.use('/api/users', require(__dirname+'/src/routes/user'));
app.use('/api/login', require(__dirname+'/src/routes/login'));
app.use('/api/logout', require(__dirname+'/src/routes/logout'));
app.use('/api/register', require(__dirname+'/src/routes/register'));
app.use('/api/search', require(__dirname+'/src/routes/search'));
app.use('/api/orders', require(__dirname+'/src/routes/order'));

app.use(express.static(__dirname + '/client/build'));

app.listen(PORT, () => console.log(`${'../'+__dirname}server is listening on ${PORT}`));