const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    image:String,
    name:String,
    title:String,
    time:Number,
    price:Number,
    about_dish:String,
    highlight:String,
    calories:Number,
    ingredients_image:String,
    ingredients_detail:Array,
    instruction_image:Array,
    instruction_detail:Array,
    category:String,
    userID:String,
    date:String,
    card:Object,
    address:Object
    
},{
    versionKey:false
})

const paymentModel=mongoose.model("payment",userSchema)

module.exports={
    paymentModel
}