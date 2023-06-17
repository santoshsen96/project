const express=require("express")

const adminUserRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { adminUserModel } = require("../model/adminUser.model")
const dataBase=[]

adminUserRouter.get("/",async(req,res)=>{
    try{
        let admin=await adminUserModel.find()
        res.send(admin)

    }catch(err){
        res.send({error:err.message})
    }
})

adminUserRouter.post("/register",async(req,res)=>{
    const {name,email,pass,image,role,description,location}=req.body
    const existingUser = dataBase.find((user) => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists, Please Login !!' });
        }
   
    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.status(400).json({error:err.message})
            }else{
                const user=new adminUserModel({name,email,pass:hash,image,role,description,location})
                dataBase.push(user)
                await user.save()
                res.status(200).json({msg:"new admin added",updatedAdmin:req.body})
            }
        });
        
       
    }catch(err){
        res.status(400).json({err:err.message})
    }

})


adminUserRouter.post("/login",async(req,res)=>{
const {name,email,pass}=req.body
    try{
        const user=await adminUserModel.findOne({email})
        
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                // result == true
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},'masai')
                    res.status(200).json({msg:"Login Successfull!!",token:token,user:req.body.name})
                }else{
                    res.status(400).json({msg:"Invalid Password !!"})
                }
            });
           
        }else{
            res.status(400).json({msg:"Invalid email !!"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
})


module.exports={
    adminUserRouter
}