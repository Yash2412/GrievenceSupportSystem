const path=require('path');
const express = require('express');
const router = express.Router();
const body=require('body-parser');


const Student = require('../models/Student');

const Comitte = require('../models/Comitte');
const Complain = require('../models/Complain');

router.get('/student/:username' , async(req,res)=>{
    const uname=req.params.username;
    const detail=await Student.find({username:uname});
     return res.send(detail);
});

router.get('/comitte/:username' , async(req,res)=>{
    const uname=req.params.username;
    const detail=await Comitte.find({username:uname});
     return res.send(detail);
});

router.get('/complain', async(req,res)=>{
    const compalins = await Complain
    .find({})
    .sort({date: -1})
    .limit(20)

    res.send(compalins)
});

module.exports = router;