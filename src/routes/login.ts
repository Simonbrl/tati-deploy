import express from 'express';
const router = express.Router();

const bcrypt = require('bcrypt');
import User from '../models/user';

router.post('/', (req: any, res: any) => {
    let email:string = req.body.email;
    let password:string = req.body.password;
    console.log(email, password);
    if(email && password) {
        User.findOne({email: email}, (err: any, docs: any) => {
            if(!err) 
                if(docs) {
                    bcrypt.compare(password, docs.password, (err: any, result: any) => {
                        if(result) {
                            docs.last_login = new Date();
                            docs.save();
                            res.cookie('user', {
                                id: docs._id,
                                firstname: docs.firstname,
                                lastname: docs.lastname,
                                email: docs.email
                            }, {httpOnly: true, sameSite: true});
                            res.send(docs);
                        }
                        else res.send(false);
                    })
                }
                else res.send(false);            
            else console.log('Error : ' + err);
        })
    }
    else res.send(false);
})

module.exports = router;