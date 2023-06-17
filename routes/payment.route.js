const express=require("express")
const jwt=require("jsonwebtoken")
const {paymentModel}=require("../model/payment.model")



const paymentRouter=express.Router()


paymentRouter.post("/add",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'masai');
    //const payload=await CartModel.find({userID:decoded.userID});
    const payload=req.body;
    try{
        if(decoded){
            const payment=new paymentModel(payload)
            await payment.save()
            res.status(200).json({msg:"card details added"})
        }else{
            res.status(400).send({msg:"Please login first!"})
        }

    }catch(err){
        res.status(400).send({msg:err})
    }
})

paymentRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'masai');
    try{
        if(decoded){
            let user=await paymentModel.findOne({userID:decoded.userID})
            res.status(200).send(user)
        }else{
            res.status(400).send({msg:"please Login first!"})
        }
    }catch(err){
        res.status(400).send({msg:err})
    }
})

paymentRouter.patch("/update/:paymentID",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const req_id=decoded.userID
    //console.log(req_id)
    const {paymentID}=req.params;
    const payment=await paymentModel.findOne({_id:paymentID})
    const userID_in_payment=payment.userID
    const payload=req.body;
    try{
        if(req_id==userID_in_payment){
            await paymentModel.findByIdAndUpdate({_id:paymentID},payload)
            res.status(200).send({msg:"card details updated successfully!"})
        }else{
            res.status(400).send({msg:"Please login first!"})
        }
       
    }catch(err){
        res.status(400).send({msg:err})
    }

})

paymentRouter.delete("/delete/:paymentID",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const req_id=decoded.userID
    console.log(req_id)
    //console.log(req_id)
    const {paymentID}=req.params;
    const payment=await paymentModel.findOne({_id:paymentID})
    const userID_in_payment=payment.userID
    //console.log(userID_in_cart)
    
    try{
        if(req_id==userID_in_payment){
            await paymentModel.findByIdAndDelete({_id:paymentID})
            res.status(200).send({msg:"orders cancelled successfully!"})
        }else{
            res.status(400).send({msg:"Please login first!"})
        }
       
    }catch(err){
        res.status(400).send({msg:err})
    }

})


module.exports={paymentRouter}