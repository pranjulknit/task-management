const jwt = require('jsonwebtoken');
const {user} = require("../db/index");
const dotenv = require("dotenv");
dotenv.config();

const secret = process.env.SECRET_KEY;
// console.log("secret",secret);
const userAuthentication = async(req,res,next)=>{
        const token = req.cookies.token;
        //   console.log("token",token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }


      if(token){
        try { 
            // console.log(token,secret);
           const decode = jwt.verify(token,secret);
            // console.log("userinfo",decode);   
            
            const userinfo = await user.findOne({_id:decode.getId});

            

            if(userinfo){
                return res.status(200).json({
                    success: true,
                    userinfo
                })
            }
           next()
            
        } catch (error) {
            // console.log("error",error);
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
            
        }
      }
}

module.exports ={
    userAuthentication
}