const express=require("express")
const {ProductModel}=require("../model/product.model")
const { OrderModel } = require("../model/order.model")
//const {auth} = require("../middleware/auth.middleware")
const adminProductRouter=express.Router()
//adminProductRouter.use(auth)


adminProductRouter.get("/",async(req,res)=>{
    try{
        let products=await ProductModel.find()
        res.send(products)

    }catch(err){
        res.send({error:err.message})
    }
})

adminProductRouter.post("/add",async(req,res)=>{
    try{
        const data=new ProductModel(req.body)
        await data.save()
        res.json({msg:"new data added",note:req.body})
    }catch(err){
        res.json({error:err.message})
    }
})

adminProductRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const payload=req.body
    try{
        await ProductModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).json({msg:"data has been updated"})
    }catch(err){
        res.status(400).json({err:err.message})
    }
    
})

adminProductRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try{
        await ProductModel.findByIdAndDelete({_id:id})
        res.status(200).json({msg:"data has been deleted"})
    }catch(err){
        res.status(400).json({err:err.message})
    }
})

adminProductRouter.get("/allOrders",async(req,res)=>{
    
    try{
        let user=await OrderModel.find()
        res.status(200).send(user)
    
    }catch(err){
        res.status(400).send({msg:err})
    }
})


module.exports={
    adminProductRouter
}