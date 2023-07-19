const express=require("express")
const { OrderModel } =require("../model/order.model");

const Allorderadmin=express.Router()



Allorderadmin.get("/",async(req,res)=>{
    try{
        const notes=await OrderModel.find()
        res.send(notes)
    }catch(err){
        res.json({error:err.message})
    }
})

module.exports={
    Allorderadmin
}