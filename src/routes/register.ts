import express from 'express';
import mongoose from 'mongoose';

const bcrypt = require('bcrypt');
const router = express.Router();

import User from '../models/user';

router.post('/', (req: any, res: any) => {
    let email:string = req.body.email;
    let password:string = bcrypt.hashSync(req.body.password, 10);
    let firstname:string = req.body.firstname;
    let lastname:string = req.body.lastname;
    let birthdate:string = req.body.birthdate;
    if(email && password && firstname && lastname && birthdate) {
        User.findOne({email: email}, (err: any, docs: any) => {
            if(!err)
                if(docs) res.send({message: "exists"});
                else{
                    let user = new User({
                        firstname: firstname,
                        lastname: lastname,
                        password: password,
                        email: email,
                        phone: '',
                        delivery_address: '',
                        invoice_address: '',
                        birthdate: birthdate,
                        rank: 0,
                        date_creation: new Date(),
                        last_login: new Date()
                    });
                    user.save((err: any) => {
                        if(!err) res.send({message: "success"});
                        else console.log('Error : ' + err);
                    })
                }
            else console.log('Error : ' + err);
        })
    }
    else res.send({message: "empty"});
})

module.exports = router;