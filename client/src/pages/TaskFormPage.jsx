import { useForm } from "react-hook-form"
import { UseTasks } from "../context/TasksContext";

const TaskFormPage = () => {
  const {register,handleSubmit}=useForm();
  const{tasks,createTask}=UseTasks();
  console.log(createTask())
  const onSubmit=handleSubmit((data)=>{
    createTask(data)
  })
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
      <input type="text" placeholder="Title" {...register('title')
    } autoFocus
    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
      <textarea cols="30" rows="3" placeholder="Description" 
      {...register('description')}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
      
      </textarea>
        <button>Save</button>
      </form>

    </div>
  )
}

export default TaskFormPage