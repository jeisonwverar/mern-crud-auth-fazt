import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
export const register =async(req,res)=>{
    const {email,password,username}=req.body;
try {

    const userFound =await User.findOne({email});
    if(userFound){
        return res.status(400).json(['the email already in use'])
    }
   const passwordHash=await bcrypt.hash(password,10);
    const newUser=new User({
        username,
        email,
        password:passwordHash
    });

    const userSaved=await newUser.save();
   const token= await createAccessToken({id:userSaved._id});
    res.cookie('token',token);
    res.json({message:"User create successfully"})
    
    /*
    res.json({
        id:userSaved._id,
        username:userSaved.username,
        email:userSaved.email,
        createAt:userSaved.createdAt,
        updateAt:userSaved.updatedAt
    });

   */
    
} catch (error) {

    res.status(500).json({message:error.message});
}
};
export const login =async(req,res)=>{
    const {email,password}=req.body;
try {
   
    const userFound= await User.findOne({email});
    if(!userFound)return res.status(400).json({message:'User not found'});

   const isMatch=await bcrypt.compare(password,userFound.password);

    if(!isMatch)return res.status(400).json({message:'Incorrect password'});

    

  
   const token= await createAccessToken({id:userFound._id});
    res.cookie('token',token);
    res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        createAt:userFound.createdAt,
        updateAt:userFound.updatedAt
    })
    
    
    
} catch (error) {

    res.status(500).json({message:error.message});
}
};
export  const logout = async (req,res)=>{
try {
    
    res.cookie('token','',{
        expires:new Date(0)
    })
    
    res.sendStatus(200);
} catch (error) {
    res.status(500).json({message:error.message});
}
}

export const profile=async(req,res)=>{
    const userFound = await User.findById(req.user.id)
    if(!userFound)return res.status(400).json({message:'User not found'});
    await res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email,
        createAt:userFound.createAt,
        updateAt:userFound.updateAt
    });
    
    
}

export const verifyToken=async(req,res)=>{
    const {token}= req.cookies;
    if(!token) return res.status(401).json({message:"Unauthorized"})

    jwt.verify(token,TOKEN_SECRET,async(err,user)=>{
    if(err)return res.status(401).json('Unauthorized')

   const userFound= await User.findById(user.id);
   if(!userFound)return res.status(401).json('Unauthorized')

   return res.json({
    id:userFound._id,
    username:userFound.username,
    email:userFound.email
   })
   })
   
};

