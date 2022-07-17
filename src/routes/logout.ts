import express from 'express';
const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.clearCookie('user');
    res.send(true);
})

module.exports = router;