const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const databaseUrl = process.env.MONGO_URL;
mongoose.connect(databaseUrl)
.then(()=>console.log("database connected"))
.catch((e)=>console.log("database connection error : ",e))


const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,

})

const user = mongoose.model("user",userSchema);

module.exports ={
    user:user
}

