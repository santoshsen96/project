const express=require("express")

const adminUserRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { adminUserModel } = require("../model/adminUser.model")
const dataBase=[]

adminUserRouter.post("/register",async(req,res)=>{
    const {name,email,pass,image,role,description,location}=req.body
    const existingUser = dataBase.find((user) => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists, Please Login !!' });
        }
    const password = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.test(pass)) {
        return res.status(400).json({ error: 'Invalid password. It should contain at least one number, one special character, and be at least 8 characters long.' });
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
const {email,pass}=req.body
    try{
        const user=await adminUserModel.findOne({email})
        
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=> {
                // result == true
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},'masai')
                    res.status(200).json({msg:"Login Successfull!!",token:token})
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