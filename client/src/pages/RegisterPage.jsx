import{useForm} from 'react-hook-form';
import {useAuth} from '../context/AuthContext'

function RegisterPage() {
    const {register, handleSubmit}=useForm()
    const {singup,user}=useAuth();
 console.log(user);
const onsubmit= handleSubmit(async(values)=>{
   singup(values);
    
   
    
   })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>

   <form onSubmit={onsubmit}>
       <input type="text" 
       {...register('username',{required:true})} 
       className='w-full bg-zinc-700 text-white px-4 p-y2 rounded-md my-2'
       placeholder='username'/>
       <input type="email" {...register('email',{required:true})} 
       className='w-full bg-zinc-700 text-white px-4 p-y2 rounded-md my-2'
       placeholder='email'/>
       <input type="password" {...register('password',{required:true})}
       className='w-full bg-zinc-700 text-white px-4 p-y2 rounded-md my-2' 
       placeholder='password'/>
       <button type="submit">
        Register
       </button>
   </form>
    </div>
  )
}

export default RegisterPage