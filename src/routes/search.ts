import express from 'express';
const router = express.Router();

import Product from '../models/product';

router.get('/:search', (req: any, res: any) => {
    Product.find({name: {$regex: req.params.search, $options: 'i'}}, (err: any, docs: any) => {
        if(!err) res.send(docs)
        else console.log('Error : ' + err);
    })
})

module.exports = router;