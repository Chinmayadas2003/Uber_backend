const jwt= require('jsonwebtoken');
const User= require('../models/user');

const authMiddleware = async (req,res,next)=>{

    console.log("Inside auth");
    //get token from header in the request
    const token=req.header('Authorization')?.replace('Bearer','');

    //token is not valid, access will be denied
    if(!token){
        return  res.status(401).send('Access Denied');
    }

    //if token is valid ,verify the token
    try {
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user= await User.findById(verified.id);
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }

    //req.user = await User.findbyId();
}

module.exports= authMiddleware;