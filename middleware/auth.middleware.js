const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        try{
            const decoded=jwt.verify(token, 'masai')
            if(decoded){
            req.body.userID=decoded.userID;
            next()
        }else{
            res.status(400).send({msg:"Token not recognised!!"})
        }
        }catch(err){
            res.json({error:err.message})
        }
    }else{
        res.json({msg:"please Login!!"})
    }
    
   
}

module.exports={auth}

