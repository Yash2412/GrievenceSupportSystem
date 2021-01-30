const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Complains=require('../models/Complain');
const Comity=require('../models/Student');
router.post('/:id',async(req,res)=>{

    const idd = req.params.id;
    const id = mongoose.Types.ObjectId(idd);

    const text=req.body.text;
    
        
   const sp= await Complains.findByIdAndUpdate(id,{$push :{ response :({text:text,
        _sender:req.user.name})}});
        if(sp.response.length%2==1)
      { var cmpln= await Complains.findByIdAndUpdate(id,{$set: { isSolved:false}});cmpln.isSolved=false;}
        else
        
     { var cmpln=  await Complains.findByIdAndUpdate(id,{$set: { isSolved:true}});cmpln.isSolved=true;}
      
        return res.send(cmpln);
    
});
module.exports=router;
