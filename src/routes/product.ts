import express from 'express';
const router = express.Router();

import Product from '../models/product';
import Category from '../models/category';

router.get('/:keyname', (req: any, res: any) => {
    if(req.params.keyname === 'tati-plus')
        Product.find({'prices.plus':{$exists:true}}, (err: any, docs: any) => {
            if(!err) res.send(docs)
            else console.log('Error : ' + err);
        })
    else
        Product.findOne({keyname: req.params.keyname}, (err: any, docs: any) => {
            if(!err) res.send(docs)
            else console.log('Error : ' + err);
        })
})

router.get('/', (req: any, res: any) => {
    Product.find((err: any, docs: any) => {
        if(!err) res.send(docs)
        else console.log('Error : ' + err);
    })
})

router.get('/:keyname/category', (req: any, res: any) => {
    Product.aggregate([
        {$match: {keyname: req.params.keyname}},
        {$lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category'
        }},
        {$project: {category: 1}}
    ]).exec((err: any, docs: any) => {
        if(!err) {
            if(docs.length > 0)
                if(docs[0].category.length > 0) res.send(docs[0].category[0])
                else res.send(null)
            else res.send(null)
        }
        else console.log('Error : ' + err);
    })
})

router.get('/random/:number', (req: any, res: any) => {
    Product.aggregate([
        {$sample: {size: Number(req.params.number)}}
    ]).exec((err: any, docs: any) => {
        if(!err) res.send(docs)
        else console.log('Error : ' + err);
    })
})

router.get('/create/new', (req: any, res: any) => {
    const products = require('../data/products.json')
    if(!products) {console.log('no file'); return}
    for(let product of products) {
        if(!product.category) continue
        // Product.deleteOne({keyname: nameToKeyname(product.name)}, (err: any) => {
        //     if(err) console.log(err)
        // })
        Product.findOne({keyname: nameToKeyname(product.name)}, (err: any, doc: any) => {
            if(doc) console.log(product.name, 'already exists')
            else {
                Category.findOne({keyname: product.category}, (err: any, doc: any) => {
                    if(doc){
                        let images:any = []
                        product.images.forEach((image: string) => {
                            let name = image
                            name = name.substring(name.lastIndexOf("/") + 1)
                            name = name.substring(0, name.indexOf("."))
                            images.push({
                                enabled: true,
                                name: name.trim(),
                                filename: image.trim(),
                                filename_small: image.replace('large', 'medium').trim()
                            })
                        })
                        const newProduct = new Product({
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
                        })
                        newProduct.save((err: any) => {
                            if(err) console.log(err)
                            else console.log(newProduct.name, 'created')
                        })
                    }
                    else{console.log(product.name, 'category not found')}
                })
            }
        })
    }
    res.send('done')
})

router.post('/create', (req: any, res: any) => {
    let name:string = req.query.name;
    let keyname:string = req.query.keyname;
    let category:string = req.query.category;
    let reference:string = req.query.reference;
    // let url:string = req.query.url;
    let price:number = req.query.price;
    let price_plus:number = req.query.price_plus;
    let description:string = req.query.description;
    let short_description:string = req.query.short_description;
    if(name && keyname && reference && price && description) {
        Product.findOne({reference: reference}, (err: any, docs: any) => {
            if(!err)
                if(docs) res.send({message: "exists"});
                else{
                    let product = new Product({
                        name: name,
                        keyname: keyname,
                        reference: reference,
                        category: category,
                        prices: [{base: price, plus: price_plus}],
                        description: description,
                        short_description: short_description,
                        keywords: []
                    });
                    res.send({message: product})
                    // product.save((err: any) => {
                    //     if(!err) res.send({message: "success"});
                    //     else console.log('Error : ' + err);
                    // })
                }
            else console.log('Error : ' + err);
        })
    }
    else res.send({message: "empty"});
})

const nameToKeyname = (name: string) => {
    let keyname:string = name.toLowerCase()
    keyname = keyname.replace(/[éèêë]/g, 'e')
    keyname = keyname.replace(/[àâäã]/g, 'a')
    keyname = keyname.replace(/[îïì]/g, 'i')
    keyname = keyname.replace(/[ôöòõ]/g, 'o')
    keyname = keyname.replace(/[ûüù]/g, 'u')
    keyname = keyname.replace(/[ç]/g, 'c')
    keyname = keyname.replace(/[^a-zA-Z0-9]/g, '-')
    keyname = keyname.replace(/-+/g, '-')
    return keyname
}

module.exports = router;