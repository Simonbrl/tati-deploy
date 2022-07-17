import express from 'express';
const router = express.Router();

import User from '../models/user';

router.get('/cookie', (req: any, res: any) => {
    if(req.cookies.user) res.send(req.cookies.user);
    else res.send(false);
})

router.get('/:id', (req: any, res: any) => {
    User.findById(req.params.id, (err: any, docs: any) => {
        if(!err) res.send(docs);
        else console.log('Error : ' + err);
    })
})

module.exports = router;