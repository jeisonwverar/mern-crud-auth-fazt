import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const{isAuthenticated,logout,user}=useAuth()
  return (
   <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
    <Link to={isAuthenticated?'/tasks':'/'}>
        <h1 className="text-2xl fon-bold ">Tasks Manager</h1>
    </Link>
    <ul className="flex gap-x-2">
        {
            (isAuthenticated)?(
                <>
        <li className="">
            welcome {user.username}
        </li>
        <li className="bg-indigo-500 px-4 py-1 rounded-sm">
            <Link to='/add-task'>Add Task</Link>
        </li>
        <li className="">
            <Link to='/' onClick={()=>logout()}>Logout</Link>
        </li>
                </>

            ):(
                <>
        <li className="bg-indigo-500 px-4 py-1 rounded-sm">
            <Link to='/login'>Login</Link>
        </li>
        <li className="bg-indigo-500 px-4 py-1 rounded-sm">
            <Link to='/register'>Register</Link>
        </li>
                </>
            )
        }
    </ul>
   </nav>
  )
}

export default Navbar