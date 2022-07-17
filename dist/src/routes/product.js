"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const product_1 = __importDefault(require("../models/product"));
const category_1 = __importDefault(require("../models/category"));
router.get('/:keyname', (req, res) => {
    if (req.params.keyname === 'tati-plus')
        product_1.default.find({ 'prices.plus': { $exists: true } }, (err, docs) => {
            if (!err)
                res.send(docs);
            else
                console.log('Error : ' + err);
        });
    else
        product_1.default.findOne({ keyname: req.params.keyname }, (err, docs) => {
            if (!err)
                res.send(docs);
            else
                console.log('Error : ' + err);
        });
});
router.get('/', (req, res) => {
    product_1.default.find((err, docs) => {
        if (!err)
            res.send(docs);
        else
            console.log('Error : ' + err);
    });
});
router.get('/:keyname/category', (req, res) => {
    product_1.default.aggregate([
        { $match: { keyname: req.params.keyname } },
        { $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            } },
        { $project: { category: 1 } }
    ]).exec((err, docs) => {
        if (!err) {
            if (docs.length > 0)
                if (docs[0].category.length > 0)
                    res.send(docs[0].category[0]);
                else
                    res.send(null);
            else
                res.send(null);
        }
        else
            console.log('Error : ' + err);
    });
});
router.get('/random/:number', (req, res) => {
    product_1.default.aggregate([
        { $sample: { size: Number(req.params.number) } }
    ]).exec((err, docs) => {
        if (!err)
            res.send(docs);
        else
            console.log('Error : ' + err);
    });
});
router.get('/create/new', (req, res) => {
    const products = require('../data/products.json');
    if (!products) {
        console.log('no file');
        return;
    }
    for (let product of products) {
        if (!product.category)
            continue;
        // Product.deleteOne({keyname: nameToKeyname(product.name)}, (err: any) => {
        //     if(err) console.log(err)
        // })
        product_1.default.findOne({ keyname: nameToKeyname(product.name) }, (err, doc) => {
            if (doc)
                console.log(product.name, 'already exists');
            else {
                category_1.default.findOne({ keyname: product.category }, (err, doc) => {
                    if (doc) {
                        let images = [];
                        product.images.forEach((image) => {
                            let name = image;
                            name = name.substring(name.lastIndexOf("/") + 1);
                            name = name.substring(0, name.indexOf("."));
                            images.push({
                                enabled: true,
                                name: name.trim(),
                                filename: image.trim(),
                                filename_small: image.replace('large', 'medium').trim()
                            });
                        });
                        const newProduct = new product_1.default({
                            name: product.name.trim(),
                            keyname: nameToKeyname(product.name.trim()),
                            reference: product.reference ? product.reference.trim() : '',
                            category: doc._id,
                            prices: product.prices,
                            images: images,
                            main_image: product.main_image,
                            description: product.description ? product.description.trim() : '',
                            short_description: product.short_description ? product.short_description.trim() : '',
                            keywords: product.keywords
                        });
                        newProduct.save((err) => {
                            if (err)
                                console.log(err);
                            else
                                console.log(newProduct.name, 'created');
                        });
                    }
                    else {
                        console.log(product.name, 'category not found');
                    }
                });
            }
        });
    }
    res.send('done');
});
router.post('/create', (req, res) => {
    let name = req.query.name;
    let keyname = req.query.keyname;
    let category = req.query.category;
    let reference = req.query.reference;
    // let url:string = req.query.url;
    let price = req.query.price;
    let price_plus = req.query.price_plus;
    let description = req.query.description;
    let short_description = req.query.short_description;
    if (name && keyname && reference && price && description) {
        product_1.default.findOne({ reference: reference }, (err, docs) => {
            if (!err)
                if (docs)
                    res.send({ message: "exists" });
                else {
                    let product = new product_1.default({
                        name: name,
                        keyname: keyname,
                        reference: reference,
                        category: category,
                        prices: [{ base: price, plus: price_plus }],
                        description: description,
                        short_description: short_description,
                        keywords: []
                    });
                    res.send({ message: product });
                    // product.save((err: any) => {
                    //     if(!err) res.send({message: "success"});
                    //     else console.log('Error : ' + err);
                    // })
                }
            else
                console.log('Error : ' + err);
        });
    }
    else
        res.send({ message: "empty" });
});
const nameToKeyname = (name) => {
    let keyname = name.toLowerCase();
    keyname = keyname.replace(/[éèêë]/g, 'e');
    keyname = keyname.replace(/[àâäã]/g, 'a');
    keyname = keyname.replace(/[îïì]/g, 'i');
    keyname = keyname.replace(/[ôöòõ]/g, 'o');
    keyname = keyname.replace(/[ûüù]/g, 'u');
    keyname = keyname.replace(/[ç]/g, 'c');
    keyname = keyname.replace(/[^a-zA-Z0-9]/g, '-');
    keyname = keyname.replace(/-+/g, '-');
    return keyname;
};
module.exports = router;
