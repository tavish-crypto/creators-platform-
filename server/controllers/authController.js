const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required",
            })
        }
        const user =  await User.findOne({
            email: email.toLowerCase().trim(),
        }).select("+password")
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
            })
        }
        const isMatch =  await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign(
            {
                userId: user._id,                
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE,
            }
        )
        user.password = undefined;
        res.status(200).json({
            success: true,
            token,
            user,
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports={
    loginUser,
}