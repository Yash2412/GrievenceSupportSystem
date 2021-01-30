const path = require('path');
const express = require('express');
const router = express.Router();
const body = require('body-parser');
const Upvote = require('../models/upvotes');
var mongoose = require('mongoose');

const Complain = require('../models/Complain');

const Student = require('../models/Student');

const Comitte = require('../models/Comitte');
router.get('/:idd', async (req, res) => {
    const idd = req.params.idd;
    const id = mongoose.Types.ObjectId(idd);

    const user = req.user;
    if (!user)
        return res.json({ 'msg': 'login first' });

    const upvote = await Upvote.findOne({ complain_id: idd, student_id: user.id });
    console.log(upvote);
    const comp = await Complain.findById(id);
    var num = comp.no_of_upvote;
    
    if (!upvote) {

        num = num + 1;
        await Complain.findByIdAndUpdate(id, { $set: { no_of_upvote: num } });
        const newUpvote = new Upvote({
            complain_id: id,
            student_id: user.id
        });
        await newUpvote.save();

    }
    else {
        num = num - 1;
        await Complain.findByIdAndUpdate(id, { $set: { no_of_upvote: num } });
        await Upvote.findByIdAndDelete(upvote.id);
    }
    return res.json({ 'msg': 'sucssesful' });
});
router.get('/check/:idd', async (req, res) => {
    const idd = req.params.idd;
    const id = mongoose.Types.ObjectId(idd);

    const user = req.user;
    if (!user)
        return res.json({ 'msg': 'login first' });

    const upvote = await Upvote.findOne({ complain_id: idd, student_id: user.id });
    if(upvote){
        return res.send({color:'rgb(231, 76, 60)'})
    }
    else{
        return res.send({color: '#717275'})
    }
});
module.exports = router;