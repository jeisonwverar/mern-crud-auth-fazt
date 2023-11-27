import Task from '../models/task.models.js';

export const getTaks=async(req,res)=>{
 const tasks= await Task.find();
try {
    res.json(tasks)
} catch (error) {
    
}
}
export const createTask=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
export const getTak=async(req,res)=>{
   try {
    
   } catch (error) {
    
   }
}
export const updateTask=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
export const deleteTask=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}