import express from 'express';
const router = express.Router();

import User from '../models/user';

router.post('/create/new', (req: any, res: any) => {
    let email:string = req.body.user;
    let products:Array<string> = req.body.products;
    let total:number = req.body.total;
    let order:any = {
        products: products,
        total: total,
        date: new Date()
    }
    User.findOne({email: email}, (err: any, docs: any) => {
        if(!err)
            if(docs) {
                docs.orders.push(order);
                docs.save();
                res.send({message: 'success'});
            }
            else res.send({message: 'user not found'});
        else console.log('Error : ' + err);
    })
})

router.get('/get', (req: any, res: any) => {
    let email:string = req.cookies.user.email;
    User.findOne({email: email}, (err: any, docs: any) => {
        if(!err)
            if(docs) res.send(docs.orders)
            else res.send({message: 'user not found'});
        else console.log('Error : ' + err);
    })
})

module.exports = router;