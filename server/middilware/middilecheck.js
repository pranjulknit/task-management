


const middilecheck = (req,res,next)=>{
    console.log("req",req.body);
    next();
}

module.exports = middilecheck