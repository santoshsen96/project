const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    image:String,
    role:String,
    description:String,
    location:String
},{
    versionKey:false
})

const adminUserModel=mongoose.model("admin",userSchema)

module.exports={
    adminUserModel
}