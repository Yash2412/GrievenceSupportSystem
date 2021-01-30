const express = require('express');
const router = express.Router();
const bp = require('body-parser');
const Complains = require('../models/Complain');
const Students = require('../models/Student');
const Comitte = require('../models/Comitte');

router.get('/student', async (req, res) => {
    const user = req.user;
    if (user) {
        const studnt = await Students.findById(user.id);
        if (studnt) {
            var num = studnt.no_of_visit;
            const cplns = await Complains.find({ college: user.college }).sort({ date: -1, no_of_upvote: 1 }).limit(num * 5);

            num = num + 1;
            await Students.findByIdAndUpdate(user.id, { $set: { no_of_visit: num } });
            return res.send(cplns);
        }
        else{
            res.send(msg, 'OOps No complains in your institute')
        }

    }

    else {
        res.status(401).send(msg, 'Click <a href="/">here</a> to Login')
    }

})


router.get('/committee', async (req, res) => {
    const user = req.user;
    if (user) {
        console.log(user)
        const studnt = await Comitte.findById(user.id);
        if (studnt) {
            const cplns = await Complains.find({ category: user.category , sub_category: user.sub_category }).sort({ date: 1, no_of_upvote: 1 });
            return res.send(cplns);
        }
        else{
            res.send(msg, 'OOps No complains in your institute')
        }

    }

    else {
        res.status(401).send(msg, 'Click <a href="/">here</a> to Login')
    }

})
module.exports = router;