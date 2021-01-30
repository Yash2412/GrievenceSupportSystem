const express = require('express');
const Students=require('../models/Student');
const router = express.Router();

router.get('/loggedin' , (req,res) =>{
    res.send(req.user);
});

router.get('/logout', async(req,res)=>{
    
await Students.findByIdAndUpdate(req.user.id, { $set: { no_of_visit: 1 } });

    req.logOut();
    res.redirect('/')
})
module.exports = router;

