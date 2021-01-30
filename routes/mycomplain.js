const path = require('path');
const express = require('express');
const router = express.Router();
const body = require('body-parser');
const Complian = require('../models/Complain');
router.get('',async(req,res)=>{
    const cplns=await Complian.find({username:req.user.username}).sort({date:-1});
    return res.json(cplns);
});
module.exports=router;