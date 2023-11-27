import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
export const register =async(req,res)=>{
    const {email,password,username}=req.body;
try {

   const passwordHash=await bcrypt.hash(password,10);
    const newUser=new User({
        username,
        email,
        password:passwordHash
    });

    const userSaved=await newUser.save();

    jwt.sign({id:userSaved._id},'secret123',{
        expiresIn:"1d"
    },(err,token)=>{
            if(err)console.log(err);
            res.cookie('token',token);
            res.json({message:"User create successfully"})
    });
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

    res.json({message:error});
}
};
export const login =(req,res)=>{

    try {
        res.send('login')
    } catch (error) {
        res.json({message:error});
    }
};