
import { useEffect } from "react";
import { UseTasks } from "../context/TasksContext";
import TasksCard from "../components/TasksCard";

function TasksPage() {
  const {tasks,getTasks}=UseTasks();
 //console.log(tasks)
  useEffect(()=>{
    getTasks()
    
  },[])

  if( tasks.length===0)return (<h1>no tasks</h1>)
  
  return (
    
    <div className="grid sm:grid-cols-2 grid-cols-3 gap-2">
      
      {
       
        

          tasks.map((task)=>(
           <TasksCard task={task} key={task._id}/>
          ))
        
      }
    </div>
  )
}

export default TasksPage;