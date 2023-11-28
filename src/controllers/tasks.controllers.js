import Task from '../models/task.models.js';

export const getTaks=async(req,res)=>{
 const tasks= await Task.find({
    //es para traer las tareas del usuario
    user:req.user.id
    //polate para relacionarlo traer sus atos
 }).populate('user');
try {
    res.json(tasks);
} catch (error) {
    res.status(500).json({message:res.message});
}
}
export const createTask=async(req,res)=>{
    const {title,description,date}=req.body;
    try {
      const newTask=new Task({
          title,
          description,
          date,
          user:req.user.id
      });
     const saveTask=await newTask.save();

        res.json(saveTask);
    } catch (error) {
        res.status(500).json({message:res.message});
    }
}
export const getTak=async(req,res)=>{
    const {id}=req.params;

   try {
    const  task=await Task.findById(id).populate('user');
    if(!task)return res.status(404);
    res.json(task); 

   } catch (error) {
    res.status(404).json({message:'ID not found'});
   }
}
export const updateTask=async(req,res)=>{
    const id=req.params.id;
    
    try {
        const  task=await Task.findByIdAndUpdate(id,req.body,{new:true});
        if(!task) return res.status(404).json({message:'ID not found'});
        res.json(task);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const deleteTask=async(req,res)=>{
    const {id}=req.params;
    try {
        const task= await Task.findOneAndDelete(id);
       if(!task) return res.status(404).json({message:'ID not found'});
       res.sendStatus(204);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}