import { createContext, useContext,useState } from "react";
import {createTasksRequest, deleteTasksRequest, getTasksRequest,getTaskRequest,updateTasksRequest} from '../api/tasks';
const TaskContext =createContext();

export const UseTasks=()=>{
    const context= useContext(TaskContext);
    if(!context){
        throw new Error('useTasks must be used within a TaskProvider')
    }
    return context;
}

export function TaskProvider({children}){
    const [tasks, setTasks] = useState([]);

    const  createTask=async(task)=>{
        
        const res=await createTasksRequest(task);
        console.log(res);
    }

    const getTasks=async()=>{
        try {
            
            const res=await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.error(error)
        }
    }
    const deleteTaks=async(id)=>{
        try {
            
           const res= await deleteTasksRequest(id);
           if(res.status==204)setTasks(tasks.filter(task=>task._id!==id))
            //console.log(res)
        } catch (error) {
            console.error(error)
        }
    }

    const getTask=async(id)=>{
        try {
            const res= await getTaskRequest(id)
            console.log(res.data)
            return res.data;
            
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id,task)=>{
        try {
            
            await updateTasksRequest(id,task);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks,
            deleteTaks,
            getTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}