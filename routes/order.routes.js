const express=require("express")
const jwt=require("jsonwebtoken")
const {OrderModel}=require("../model/order.model")
const {CartModel}=require("../model/cart.model")
//const {auth}= require("../middleware/auth.middleware")


const orderRouter=express.Router()
//orderRouter.use(auth)

orderRouter.post("/add",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'masai');
    //const payload=await CartModel.find({userID:decoded.userID});
    const payload=req.body;
    try{
        if(decoded){
            for(let i=0; i<=payload.length-1; i++){
                payload[i].date=new Date().toDateString()
            }
            await OrderModel.insertMany(payload)
            res.status(200).send({msg:"product added in order successfully"})
        }else{
            res.status(400).send({msg:"Please login first!"})
        }

    }catch(err){
        res.status(400).send({msg:err})
    }
})

orderRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded = jwt.verify(token, 'masai');
    try{
        if(decoded){
            let user=await OrderModel.find({userID:decoded.userID})
            res.status(200).send(user)
        }else{
            res.status(400).send({msg:"please Login first!"})
        }
    }catch(err){
        res.status(400).send({msg:err})
    }
})
orderRouter.patch("/update/:cartID",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const req_id=decoded.userID
    //console.log(req_id)
    const {cartID}=req.params;
    const cart=await OrderModel.findOne({_id:cartID})
    const userID_in_cart=cart.userID
    const payload=req.body;
    try{
        if(req_id==userID_in_cart){
            await OrderModel.findByIdAndUpdate({_id:cartID},payload)
            res.status(200).send({msg:"order product updated successfully!"})
        }else{
            res.status(400).send({msg:"Please login first!"})
        }
       
    }catch(err){
        res.status(400).send({msg:err})
    }

})


   
orderRouter.delete("/deleteallorder",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            await OrderModel.deleteMany({userID:decoded.userID})
            res.status(200).send({msg:"order allproduct deleted successfully!"})
        }else{
            res.status(400).send({msg:"Please login first!"})
        }

    }catch(err){
        res.status(400).send({msg:err})
    }
})





module.exports={orderRouter}